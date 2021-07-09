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
}
