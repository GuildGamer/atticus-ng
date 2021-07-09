import { Component } from '@angular/core';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent {
	id_count: number = 0;

	c_text: string = "";
	constructor() {

	}

	alert(text: string, err: boolean) {
		let id = `close-alert-${this.id_count}`;
		let alDiv = document.getElementById('alDiv');

		let container = document.createElement('div');
		container.classList.add(err ? 'uk-alert-warning' : 'uk-alert-success');
		container.setAttribute('uk-alert', '');
		let closer = document.createElement('a');
		closer.classList.add('uk-alert-close');
		closer.setAttribute('uk-close', '');
		closer.id = id;
		let parag = document.createElement('p');
		let textNode = document.createTextNode(text);
		parag.appendChild(textNode);
		container.appendChild(closer);
		container.appendChild(parag);
		alDiv?.appendChild(container);

		this.close(id);
		this.id_count++;
	}

	close(id: string) {
		setTimeout(() => {
			document.getElementById(id)?.click();
		}, 10000);
	}
}
