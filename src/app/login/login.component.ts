import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AddressService } from '../address.service';
import { AppComponent } from '../app.component';
import { CommsService } from '../comms.service';

interface LoginAPIData {
	success: boolean;//if the request completed successfully
	reason: string;//only provided if the request failed
	token: string;//JWT
}

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
	username: string = '';
	password: string = '';

	loading: boolean = false;

	constructor(
		private app: AppComponent,
		private comms: CommsService,
		private router: Router,
		private address: AddressService
	) { }

	ngOnInit(): void {
	}

	validate() {
		let wsp = /^\s*$/;
		if (wsp.test(this.username) || wsp.test(this.password)) {
			this.app.alert("Please provide both your username and password", true);
		}
		else {
			this.loading = true;
			this.comms.login(this.username, this.password).subscribe((data: LoginAPIData) => {
				this.loading = false;
				if (data.success) {
					this.app.alert("Login Successful!", false);
					localStorage.setItem('token', data.token);
					localStorage.setItem('l_in', 'true');
					setTimeout(() => {
						location.assign(this.address.SITE_ADDRESS);
					}, 2000);
				}
				else {
					this.app.alert(data.reason, true);
				}
			}, () => {
				this.loading = false;
				this.app.alert("Please check your connection", true);
			});
		}
	}
}
