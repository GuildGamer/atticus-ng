import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';
import { CommsService } from '../comms.service';

interface BlogPost {
	heading: string;
	content: string;
}

interface EditPostData {
	success: boolean;//true if the administrator is logged in
	reason: string;//provided if there is an error or the administrator isn't logged in
	post: BlogPost;
}

interface CreatePostData {
	post_id: string;
	success: boolean;//true if the administrator is logged in
	reason: string;//provided if there is an error or the administrator isn't logged in
}

@Component({
	selector: 'app-edit-blog-post',
	templateUrl: './edit-blog-post.component.html',
	styleUrls: ['./edit-blog-post.component.scss']
})
export class EditBlogPostComponent implements OnInit {
	post_id: string = '';

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
		this.post_id = this.router.parseUrl(this.router.url).root.children.primary.segments[1].path;
		this.load();
	}

	ngOnInit(): void {
	}

	load() {
		this.loading = true;
		this.comms.editBlogPost(this.post_id).subscribe((data: EditPostData) => {
			this.loading = false;
			if (data.success) {
				this.loggedIn = true;
				this.post = data.post.content;
				this.heading = data.post.heading;
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
			this.comms.updateBlogPost(this.post_id, this.heading, this.post).subscribe((data: CreatePostData)=>{
				this.createLoading = false;
				if(data.success){
					this.router.navigate(['/blog']);
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
