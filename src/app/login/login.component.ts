import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
	email: string = '';
	password: string = '';

	loading: boolean = false;

	constructor(
		private app: AppComponent,
		private comms: CommsService,
		private router: Router
	) { }

	ngOnInit(): void {
	}

	validate() {
		let wsp = /^\s*$/;
		if (wsp.test(this.email) || wsp.test(this.password)) {
			this.app.alert("Please provide both your email address and a password", true);
		}
		else {
			this.loading = true;
			this.comms.login(this.email, this.password).subscribe((data: LoginAPIData) => {
				this.loading = false;
				if (data.success) {
					this.app.alert("Login Successful!", false);
					localStorage.setItem('token', data.token);
					setTimeout(() => {
						this.router.navigate(['/']);
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
