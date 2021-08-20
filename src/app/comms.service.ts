import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
	providedIn: 'root'
})
export class CommsService {

	constructor(
		private request: ApiService
	) { }

	login(username: string, password: string): Observable<any> {
		return this.request.request('signin/', 'post', false, {
			username: username,
			password: password
		});
	}

	pay(
		tx_ref: string,
		amount: number,
		redirect_url: string,
		customer: any,
		customizations: any
	): Observable<any> {
		return this.request.payment({
			tx_ref: tx_ref,
			amount: amount,
			payment_options: "card",
			redirect_url: redirect_url,
			customer: customer,
			currency: "NGN",
			customizations: customizations
		});
	}

	validatePayment(tx_ref: string, trans_id: string): Observable<any> {
		return this.request.request('validate-transaction', 'post', false, {
			tx_ref: tx_ref,
			trans_id: trans_id
		});
	}

	book(full_name: string, email: string, reason: string): Observable<any> {
		return this.request.request('book-consultation', 'post', false, {
			full_name: full_name,
			email: email,
			reason: reason
		});
	}

	loadBlog(): Observable<any> {
		return this.request.request('blog/', 'get', false);
	}

	loadPost(post_id: string): Observable<any> {
		return this.request.request(`blog-post/${post_id}`, 'get', false);
	}

	signup(username: string, email: string, password: string): Observable<any> {
		return this.request.request('signup/', 'post', false, { username: username, email: email, password: password });
	}

	adminLogin(username: string, password: string): Observable<any> {
		return this.request.request('admin-login', 'post', true, { username: username, password: password });
	}

	validateAdmin(): Observable<any> {
		return this.request.request('validate-admin', 'get', true);
	}

	createBlogPost(title: string, content: string): Observable<any> {
		return this.request.request('create-blog-post/', 'post', true, { title: title, content: content });
	}

	deleteBlogPost(post_id: string): Observable<any> {
		return this.request.request(`delete-blog-post/${post_id}`, 'get', true);
	}

	editBlogPost(post_id: string): Observable<any> {
		return this.request.request(`edit-blog-post/${post_id}`, 'get', true);
	}

	updateBlogPost(post_id: string, title: string, content: string): Observable<any> {
		return this.request.request('update-blog-post', 'post', true, { post_id: post_id, title: title, content: content });
	}

	likePost(post_id: string, like: boolean): Observable<any> {
		return this.request.request('like-blog-post', 'post', false, { post_id: post_id, like: like });
	}

	comment(post_id: string, comment: string): Observable<any> {
		return this.request.request('comment-on-blog-post', 'post', false, { post_id: post_id, comment: comment });
	}

	//when the comment poster wants to delete their comment
	deleteComment(comment_id: string): Observable<any> {
		return this.request.request(`delete-comment/${comment_id}`, 'get', false);
	}

	//when the site admin wants to remove a comment
	removeComment(comment_id: string): Observable<any> {
		return this.request.request(`remove-comment/${comment_id}`, 'get', true);
	}
}
