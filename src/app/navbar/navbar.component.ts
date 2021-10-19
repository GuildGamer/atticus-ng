import { Component, OnInit } from '@angular/core';
import { AddressService } from '../address.service';

@Component({
	selector: 'app-navbar',
	templateUrl: './navbar.component.html',
	styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
	loggedIn: boolean = false;
	adminLoggedIn: boolean = false;

	constructor(
		private address: AddressService
	) {
		let lString = localStorage.getItem('l_in') ?? 'false';
		if (lString == 'true') {
			this.loggedIn = true;
		}
		let a_l = localStorage.getItem('a_l_in') ?? 'false';
		if(a_l == 'true'){
			this.adminLoggedIn = true;
		}
	}

	ngOnInit(): void {
	}

	logout() {
		localStorage.removeItem('token');
		localStorage.setItem('l_in', 'false');
		location.assign(this.address.SITE_ADDRESS);
	}

	aLogout() {
		localStorage.removeItem('access_token');
		localStorage.setItem('a_l_in', 'false');
		location.assign(this.address.SITE_ADDRESS);
	}

	clicked() {
		document.getElementById('closer')?.click();
		document.getElementById('closer')?.blur();
	}
}
