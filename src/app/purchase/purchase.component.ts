import { Component, OnInit } from '@angular/core';
import { AddressService } from '../address.service';
import { AppComponent } from '../app.component';
import { CommsService } from '../comms.service';

@Component({
	selector: 'app-purchase',
	templateUrl: './purchase.component.html',
	styleUrls: ['./purchase.component.scss']
})
export class PurchaseComponent implements OnInit {
	full_name: string = "";
	email: string = "";
	price: number = 1600;

	opLoading: boolean = false;

	constructor(
		private comms: CommsService,
		private app: AppComponent,
		private address: AddressService
	) { }

	ngOnInit(): void {
	}

	validate(){
		let wsp = /^\s*$/;
		if(wsp.test(this.full_name) || wsp.test(this.email)){
			this.app.alert("Please provide your name and email address", true);
		}
		else {
			let txRef = new Date().getTime().toString();
			let cDets = {
				name: this.full_name,
				email: this.email
			}
			let custom = {
				title: "Gad Legal Consult",
				description: "Purchase of e-book"
			}

			this.opLoading = true;
			this.comms.pay(txRef, this.price, `${this.address.SITE_ADDRESS}/purchased`, cDets, custom).subscribe((data)=>{
				this.opLoading = false;
				this.app.alert("You will be redirected to complete your payment", false);
				if(data.status == 'success'){
					window.open(data.data.link, "_blank");
				}
				else {
					this.app.alert("An error occured. Please try again later. If this persists, contact Support", true);
				}
			}, (e)=>{
				console.log(e)
				this.opLoading = false;
				this.app.alert("Unable to reach Payment Provider. Please try again later", true);
			});
		}
	}
}
