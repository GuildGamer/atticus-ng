import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';
import { CommsService } from '../comms.service';

interface SignupAPIData {
	success: boolean;//if the request completed successfully
	reason: string;//only provided if the request failed
	token: string;//JWT
}

@Component({
	selector: 'app-signup',
	templateUrl: './signup.component.html',
	styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
	username: string = '';
	email: string = '';
	password: string = '';
	cPass: string = '';

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
		if (wsp.test(this.username) || wsp.test(this.email) || wsp.test(this.password) || wsp.test(this.cPass)) {
			this.app.alert("All fields are required", true);
		}
		else if(this.password !== this.cPass){
			this.app.alert("Your Password and Confirmation do not match", true);
		}
		else {
			this.loading = true;
			this.comms.signup(this.username, this.email, this.password).subscribe((data: SignupAPIData) => {
				this.loading = false;
				if (data.success) {
					this.app.alert("Signup Successful!", false);
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
