import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})

export class AddressService {
	// SERVER_ADDRESS: string =  'https://gadconsult.herokuapp.com';
	SERVER_ADDRESS: string = "http://127.0.0.1:8031";
	// SITE_ADDRESS: string = 'https://www.gadconsult.ng';
	SITE_ADDRESS: string = "http://127.0.0.1:4200";

	constructor() {
	}
}
