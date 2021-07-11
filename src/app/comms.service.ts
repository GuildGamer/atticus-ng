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

	login(email: string, password: string): Observable<any> {
		return this.request.request('signin', 'post', {
			email: email,
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
			customizations: customizations
		});
	}
}
