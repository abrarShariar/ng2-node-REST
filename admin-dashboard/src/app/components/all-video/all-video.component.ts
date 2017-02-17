import { Component, OnInit } from '@angular/core';
import { AllVideoService } from '../../services/all-video.service';
import { Video } from '../../classes/Video';

@Component({
	selector: '',
	templateUrl: './all-video.component.html',
	styleUrls: ['./all-video.component.css'],
	providers: [AllVideoService]
})
export class AllVideoComponent implements OnInit{
	title:string = 'All Videos';
	
	allVideo:Video[] = [];
	errorMessage: string;
	mode = 'Observable';

	constructor(private allVideoService: AllVideoService){}

	ngOnInit(){
		this.getAllVideo();
	}

	//get all video data from service
	getAllVideo():void{
		this.allVideoService.getAllVideo()
		.subscribe(
			response => this.allVideo = response,
			error => this.errorMessage = <any>error
			);
	}

}
