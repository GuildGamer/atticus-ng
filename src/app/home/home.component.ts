import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
	services: Array<any>;
	content1 = "We help you register your business, company, partnership and NGOs and other non-profit organisations. We also provide post incorporation services after registration.";
	content2 = "We provide solution oriented legal advice and opinion to business owners. We provide practical business advice to business owners.";
	content3 = "As part of the ways we protect your business we help you register their trademarks and other intellectual properties.";
	content4 = "Retainership is our premium package that provides you with all our services.";
	content5 = "We provide professional representative and proxy services suited to your interest.";
	content6 = "We represent your business interest and help you negotiate contracts and agreements to suit your business goals.";
	lText: string = "I started out as a lawyer with the vision to help as many people as I can with my knowledge of the law. With this in mind, I have come to find that so many business owners are faced with difficulties in structuring and protecting their businesses. I help business owners by protecting their business and putting structures in place to help them run their business with ease.";

	constructor(
		private router: Router
	) {
		this.services = [
			[
				{
					title: "Business Registration and Incorporation",
					icon: "/assets/icons/registration.png",
					content: this.content1
				},
				{
					title: "Business and Legal Advisory",
					icon: "/assets/icons/advisory.png",
					content: this.content2
				}
			],
			[

				{
					title: "Trademark Filing and Registration",
					icon: "/assets/icons/trademarks.png",
					content: this.content3
				},
				{
					title: "Business Legal Retainership",
					icon: "/assets/icons/retainership.png",
					content: this.content4
				}
			],
			[

				{
					title: "Legal Correspondence",
					icon: "/assets/icons/correspondence.png",
					content: this.content5
				},
				{
					title: "Business Negotiation and Representation",
					icon: "/assets/icons/negotiation.png",
					content: this.content6
				},
			]
		];
	}

	ngOnInit(): void {
	}

	consultation(){
		this.router.navigate(['/consultation']);
	}

	purchase(){
		this.router.navigate(['/purchase']);
	}
}
