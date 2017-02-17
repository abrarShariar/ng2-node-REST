import { Component, OnInit } from '@angular/core';
import { HomeService } from '../../services/home.service';

@Component({
	selector: 'home-dash',
	templateUrl: './home.component.html',
	styleUrls: ['../../app.component.css'],
	providers: [ HomeService ]
})
export class HomeComponent implements OnInit{ 
	title:string = "Admin Home";

	countVideo:any = 0;
	errorMessage: string;
	mode = 'Observable';

	constructor(private homeService: HomeService){}

	ngOnInit(){
		this.getVideoCount();
	}

	getVideoCount(){
		this.homeService.getVideoCount()
		.subscribe(
			response => this.countVideo = response[0].video_count,
			error => this.errorMessage = <any>error
			);
	}
}