import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';
import { CommsService } from '../comms.service';

interface BlogPost {
	heading: string;
	date_created: string;
	post_id: string;
}

interface BlogAPIData {
	success: boolean;//if the request completed successfully
	reason: string;//only provided if the request failed
	isAdmin: boolean;//if the Administrator is logged in
	posts: Array<BlogPost>;
}

interface DeletePostData {
	success: boolean;//if the request completed successfully
	reason: string;//only provided if the request failed
}

@Component({
	selector: 'app-blog',
	templateUrl: './blog.component.html',
	styleUrls: ['./blog.component.scss']
})

export class BlogComponent implements OnInit {
	loading: boolean = false;

	isAdmin: boolean = false;
	posts: Array<BlogPost> = [];
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
		this.comms.loadBlog().subscribe((data: BlogAPIData) => {
			this.loading = false;
			if (data.success) {
				this.posts = data.posts;
				this.isAdmin = data.isAdmin;
			}
			else {
				this.app.alert(data.reason, true);
			}
		}, (e) => {
			console.log(e);
			this.loading = false;
			this.app.alert("Please check your connection", true);
		});
	}

	edit(post_id: string) {
		if (this.isAdmin) {
			this.router.navigate(['/edit-blog-post', post_id]);
		}
	}

	delete(post_id: string) {
		if (this.isAdmin) {
			this.comms.deleteBlogPost(post_id).subscribe((data: DeletePostData) => {
				if (data.success) {
					location.reload();
				}
				else {
					this.app.alert(data.reason, true);
				}
			}, () => {
				this.app.alert("Please check your connection", true);
			});
		}
	}
}
