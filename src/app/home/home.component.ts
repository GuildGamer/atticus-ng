import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
	services: Array<any>;
	content = "Gad Legal is a business law firm that helps to provide legal structures for businesses and protects their legal interests so that they can run their businesses with ease and peace of mind.";
	
	constructor(
		private router: Router
	) {
		this.services = [
			[
				{
					title: "Business Registration and Incorporation",
					icon: "/assets/icons/registration.png",
					content: this.content
				},
				{
					title: "Business and Legal Advisory",
					icon: "/assets/icons/advisory.png",
					content: this.content
				}
			],
			[

				{
					title: "Trademark Filing and Registration",
					icon: "/assets/icons/trademarks.png",
					content: this.content
				},
				{
					title: "Business Legal Retainership",
					icon: "/assets/icons/retainership.png",
					content: this.content
				}
			],
			[

				{
					title: "Legal Correspondence",
					icon: "/assets/icons/correspondence.png",
					content: this.content
				},
				{
					title: "Business Negotiation and Representation",
					icon: "/assets/icons/negotiation.png",
					content: this.content
				},
			]
		];
	}

	ngOnInit(): void {
	}

	book(){
		this.router.navigate(['/book']);
	}
}
