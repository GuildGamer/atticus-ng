import { Component, OnInit } from '@angular/core';
import { AddressService } from '../address.service';

@Component({
	selector: 'app-navbar',
	templateUrl: './navbar.component.html',
	styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
	loggedIn: boolean = false;

	constructor(
		private address: AddressService
	) {
		let lString = localStorage.getItem('l_in') ?? 'false';
		if (lString == 'true') {
			this.loggedIn = true;
		}
	}

	ngOnInit(): void {
	}

	logout() {
		localStorage.removeItem('token');
		localStorage.setItem('l_in', 'false');
		location.assign(this.address.SITE_ADDRESS);
	}
}
