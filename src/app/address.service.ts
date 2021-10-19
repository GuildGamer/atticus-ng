import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})

export class AddressService {
	//SERVER_ADDRESS: string =  'http://0.0.0.0:8000';
	SERVER_ADDRESS: string = "https://secure-spire-44407.herokuapp.com";
	SITE_ADDRESS: string = 'https://glc.ng';
	//SITE_ADDRESS: string = "http://127.0.0.1:4200";
	SECURE_KEY: string = "FLWSECK-1ed9302820737f0454aea8aa138abe95-X";

	constructor() {
	}
}
