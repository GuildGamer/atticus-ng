import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})

export class AddressService {
	// SERVER_ADDRESS: string =  'https://gadconsult.herokuapp.com';
	SERVER_ADDRESS: string = "http://127.0.0.1:8031";
	SITE_ADDRESS: string = 'https://silly-blackwell-cd708a.netlify.app';
	// SITE_ADDRESS: string = "http://127.0.0.1:4200";
	SECURE_KEY: string = "FLWSECK_TEST-18b53685218e84458c1c56e9c463a207-X";

	constructor() {
	}
}
