import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import { CommsService } from '../comms.service';

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
		private comms: CommsService,
		private app: AppComponent
	) { }

	ngOnInit(): void {
	}

	validate(){}
}
