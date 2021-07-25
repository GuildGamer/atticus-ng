import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';
import { CommsService } from '../comms.service';

interface ValidateData {
	success: boolean;//true if the administrator is logged in
	reason: string;//provided if there is an error or the administrator isn't logged in
}

interface CreatePostData {
	post_id: string;
	success: boolean;//true if the administrator is logged in
	reason: string;//provided if there is an error or the administrator isn't logged in
}

@Component({
	selector: 'app-create-blog-post',
	templateUrl: './create-blog-post.component.html',
	styleUrls: ['./create-blog-post.component.scss']
})
export class CreateBlogPostComponent implements OnInit {
	loggedIn: boolean = false;
	loading: boolean = false;
	createLoading: boolean = false;

	heading: string = '';
	post: string = '';

	constructor(
		private app: AppComponent,
		private comms: CommsService,
		private router: Router
	) {
		this.load();
	}

	ngOnInit(): void {
	}

	load() {
		this.loading = true;
		this.comms.validateAdmin().subscribe((data: ValidateData) => {
			this.loading = false;
			if (data.success) {
				this.loggedIn = true;
			}
			else {
				this.app.alert(data.reason, true);
			}
		}, () => {
			this.loading = false;
			this.app.alert("Please check your connection", true);
		});
	}

	validate(){
		let wsp = /^\s*$/;
		if(wsp.test(this.heading) || wsp.test(this.post)){
			this.app.alert("Please provide both a heading and content", true);
		}
		else {
			this.createLoading = true;
			this.comms.createBlogPost(this.heading, this.post).subscribe((data: CreatePostData)=>{
				this.createLoading = false;
				if(data.success){
					this.router.navigate(['/blog-post', data.post_id]);
				}
				else {
					this.app.alert(data.reason, true);
				}
			}, ()=>{
				this.createLoading = false;
				this.app.alert("Please check your connection", true);
			});
		}
	}
}
