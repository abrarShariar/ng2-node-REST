import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {Location} from '@angular/common';
import { VideoDetailService } from '../../services/video-detail.service';
import { Video } from '../../classes/Video';

@Component({
	selector: '',
	templateUrl: './video-detail.component.html',
	styleUrls: ['./video-detail.component.css'],
	providers: [ VideoDetailService ]

})
export class VideoDetailComponent implements OnInit, OnDestroy{
	id: number;
	private sub: any;
	videoDetail:Video[];
	errorMessage: string;

	constructor(private _location:Location ,private route: ActivatedRoute, private videoDetailService:VideoDetailService) {}

	ngOnInit(){
		this.sub = this.route.params.subscribe(params => {
			this.id = params['id'];
			this.getVideoDetail(this.id);
		});
	}

	//get all video data from service
	getVideoDetail(id):void{
		this.videoDetailService.getVideoDetail(id)
		.subscribe(
			response => this.videoDetail = response,
			error => this.errorMessage = <any>error
			);
	}

	//go back
	goBack(){
		this._location.back();
	}

	ngOnDestroy(){
		this.sub.unsubscribe();
	}
}