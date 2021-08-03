import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import { CommsService } from '../comms.service';

interface BookingAPIData {
	success: boolean;//if the request completed successfully
	reason: string;//only provided if the request failed
}

@Component({
	selector: 'app-booking',
	templateUrl: './booking.component.html',
	styleUrls: ['./booking.component.scss']
})
export class BookingComponent implements OnInit {
	full_name: string = "";
	email: string = "";
	reason: string = "";

	opLoading: boolean = false;
	constructor(
		private app: AppComponent,
		private comms: CommsService
	) {
		
	}

	ngOnInit(): void {
	}

	validate(){
		let wsp = /^\s*$/;
		if(wsp.test(this.full_name) || wsp.test(this.email) || wsp.test(this.reason)){
			this.app.alert("Please fill out all fields", true);
		}
		else {
			this.book();
		}
	}

	book() {
		this.opLoading = true;
		this.comms.book(this.full_name, this.email, this.reason).subscribe((data: BookingAPIData) => {
			this.opLoading = false;
			if (data.success) {
				this.app.alert("Successful! We'll be in touch via email", false);
			}
			else {
				this.app.alert(data.reason, true);
			}
		}, () => {
			this.opLoading = false;
			this.app.alert("Please check your connection", true);
		});
	}
}
