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

	request(path: string, method: string, body?: any): Observable<any> {
		if (method === 'post') {
			return this.http.post(`${this.api}/${path}`, body);
		}
		else {
			return this.http.get(`${this.api}/${path}`);
		}
	}

	payment(body: any): Observable<any> {
		return this.http.post(`${this.address.SITE_ADDRESS}/api`, body, { headers: { Authorization: `Bearer ${this.address.SECURE_KEY}` } });
	}
}
