import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';
import { CommsService } from '../comms.service';

interface BlogPost {
	heading: string;
	content: string;
	like_count: number;
	date_created: string;
	post_id: string;
}

interface BlogComment {
	comment_id: string;
	content: string;
	date_created: string;
	username: string;
	post_id: string;
}

interface PostAPIData {
	post: BlogPost;
	comments: Array<BlogComment>;
	success: boolean;//if the request completed successfully
	reason: string;//only provided if the request failed
	logged_in: boolean;
	username: string;//username of the logged in user, only if user is logged in
	isAdmin: boolean;//if the administrator is logged in
	liked: boolean;//if the logged in user liked the post
}

interface CommentAPIData {
	comment: BlogComment;
	success: boolean;//if the request completed successfully
	reason: string;//only provided if the request failed
}

@Component({
	selector: 'app-post',
	templateUrl: './post.component.html',
	styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
	loading: boolean = false;
	commLoading: boolean = false;
	post_id: string = '';

	post: BlogPost | null = null;
	comments: Array<BlogComment> = [];
	loggedIn: boolean = false;
	username: string = '';
	isAdmin: boolean = false;
	liked: boolean = false;

	comm_text: string = '';

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
		this.comms.loadPost(this.post_id).subscribe((data: PostAPIData) => {
			this.loading = false;
			if (data.success) {
				this.post = data.post;
				this.loggedIn = data.logged_in;
				this.comments = data.comments;
				this.isAdmin = data.isAdmin;
				this.liked = data.liked;
				if (data.logged_in) {
					this.username = data.username;
				}
			}
			else {
				this.app.alert(data.reason, true);
			}
		}, () => {
			this.loading = false;
			this.app.alert("Please check your connection", true);
		});
	}

	comment() {
		if (this.loggedIn) {
			let wsp = /^\s*$/;
			if (wsp.test(this.comm_text)) {
				this.app.alert("Please provide a valid comment", true);
			}
			else {
				this.commLoading = true;
				this.comms.comment(this.post_id, this.comm_text).subscribe((data: CommentAPIData) => {
					this.commLoading = false;
					if (data.success) {
						this.comments.push(data.comment);
					}
					else {
						this.app.alert(data.reason, true);
					}
				}, () => {
					this.commLoading = false;
					this.app.alert("Please check your connection", true);
				});
			}
		}
	}

	like() {
		if (this.loggedIn) {
			this.comms.likePost(this.post_id, this.liked).subscribe((data) => {
				if (data.success) {
					this.liked = !this.liked;
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
