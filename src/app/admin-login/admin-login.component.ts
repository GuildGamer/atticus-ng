import { Component, OnInit } from '@angular/core';
import { AddressService } from '../address.service';
import { AppComponent } from '../app.component';
import { CommsService } from '../comms.service';

@Component({
	selector: 'app-admin-login',
	templateUrl: './admin-login.component.html',
	styleUrls: ['./admin-login.component.scss']
})
export class AdminLoginComponent implements OnInit {
	username: string = '';
	password: string = '';

	loading: boolean = false;

	constructor(
		private app: AppComponent,
		private comms: CommsService,
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
			this.comms.adminLogin(this.username, this.password).subscribe((data) => {
				this.loading = false;
				if (data.success) {
					this.app.alert("Login Successful!", false);
					localStorage.setItem('access_token', data.token);
					localStorage.setItem('a_l_in', 'true');
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
