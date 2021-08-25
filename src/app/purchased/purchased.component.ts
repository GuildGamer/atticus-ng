import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';
import { CommsService } from '../comms.service';

@Component({
	selector: 'app-purchased',
	templateUrl: './purchased.component.html',
	styleUrls: ['./purchased.component.scss']
})
export class PurchasedComponent implements OnInit {
	loading: boolean = false;
	verified: boolean = false;

	constructor(
		private router: Router,
		private app: AppComponent,
		private comms: CommsService
	) {
		let parsedRoute = this.router.parseUrl(this.router.url)
		let status = parsedRoute.queryParamMap.get('status');
		
		if (status === 'successful') {
			let tx_ref = parsedRoute.queryParamMap.get('tx_ref');
			let trans_id = parsedRoute.queryParamMap.get('transaction_id');

			//this.app.alert(`Transaction Ref: ${tx_ref}\nTransaction ID: ${trans_id}`, false);
			this.verified = true;
			 if(tx_ref && trans_id){
			 	this.validate(tx_ref, trans_id);
			}
			else {
			this.app.alert("Malformed response. Please contact Support to validate your payment", true);
			}
		}
	}

	ngOnInit(): void {
	}

	validate(tx_ref: string, trans_id: string) {
		this.loading = true;
		this.comms.validatePayment(tx_ref, trans_id).subscribe((data)=>{
			this.loading = false;
			if(data.success){
				this.verified = true;
			}
			else {
				this.app.alert(data.reason, true);
			}
		}, ()=>{
			this.loading = false;
			this.app.alert("Please check your connection", true);
		});
	}
}
