import { Component, Input, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import { CommsService } from '../comms.service';

interface CommentAPIData {
	success: boolean;//if the request completed successfully
	reason: string;//only provided if the request failed
}

@Component({
	selector: 'app-comment',
	templateUrl: './comment.component.html',
	styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {
	@Input() comment: any;
	@Input() username: any;
	@Input() isAdmin: any;

	canDelete: boolean = false;
	editing: boolean = false;
	loading: boolean = false;

	constructor(
		private app: AppComponent,
		private comms: CommsService
	) { }

	ngOnInit(): void {
		if (this.comment.username === this.username) {
			this.canDelete = true;
		}
	}

	delete() {
		if (this.canDelete) {
			this.loading = true;
			this.comms.deleteComment(this.comment.comment_id).subscribe((data: CommentAPIData) => {
				this.loading = false;
				if (data.success) {
					location.reload();
				}
				else {
					this.app.alert(data.reason, true);
				}
			}, () => {
				this.loading = false;
				this.app.alert("Please check your connection", true);
			});
		}
	}

	remove() {
		if (this.isAdmin) {
			this.loading = true;
			this.comms.removeComment(this.comment.comment_id).subscribe((data: CommentAPIData) => {
				this.loading = false;
				if (data.success) {
					location.reload();
				}
				else {
					this.app.alert(data.reason, true);
				}
			}, () => {
				this.loading = false;
				this.app.alert("Please check your connection", true);
			});
		}
	}
}
