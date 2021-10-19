import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AddressService } from "./address.service";

@Injectable({
	providedIn: 'root'
})
export class ApiService {
	api: string;

	constructor(
		private http: HttpClient,
		private address: AddressService
	) {
		this.api = this.address.SERVER_ADDRESS;
	}

	request(path: string, method: string, admin: boolean, body?: any): Observable<any> {
		if (!admin) {
			let token = localStorage.getItem('token');
			if (token) {
				// if (method === 'post') {
				// 	return this.http.post(`${this.api}/${path}`, body, { headers: { Authorization: `Bearer ${token}` } });
				// }
				// else {
				// 	return this.http.get(`${this.api}/${path}`, { headers: { Authorization: `Bearer ${token}` } });
				// }
				if (body) {
					body.u_id = token;
				}
				else {
					body = { u_id: token }
				}
				return this.http.post(`${this.api}/${path}`, body);
			}
			else {
				if (method === 'post') {
					return this.http.post(`${this.api}/${path}`, body);
				}
				else {
					return this.http.get(`${this.api}/${path}`);
				}
			}
		}
		else {
			let a_token = localStorage.getItem('access_token');
			if (a_token) {
				// if (method === 'post') {
				// 	return this.http.post(`${this.api}/admin/${path}`, body, { headers: { Authorization: `Bearer ${a_token}` } });
				// }
				// else {
				// 	return this.http.get(`${this.api}/admin/${path}`, { headers: { Authorization: `Bearer ${a_token}` } });
				// }
				if (body) {
					body.a_id = a_token;
				}
				else {
					body = { a_id: a_token }
				}
				return this.http.post(`${this.api}/${path}`, body);
			}
			else {
				if (method === 'post') {
					return this.http.post(`${this.api}/${path}`, body);
				}
				else {
					return this.http.get(`${this.api}/${path}`);
				}
			}
		}
	}

	payment(body: any): Observable<any> {
		return this.http.post(`${this.address.SITE_ADDRESS}/api`, body, { headers: { Authorization: `Bearer ${this.address.SECURE_KEY}` } });
	}
}
