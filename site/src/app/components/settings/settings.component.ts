import { Component, OnInit, DoCheck } from '@angular/core';
import { SettingsService } from '../../services/settings.service';

@Component({
	selector: '',
	templateUrl: './settings.component.html',
	styleUrls: ['./settings.component.css'],
	providers: [SettingsService]
})
export class SettingsComponent implements OnInit{
	title:string = "Settings";
	truncateResponse:any;
	checkClean:boolean = false;

	ngOnInit(){

	}

	ngDoCheck(){

	}


	constructor(private settingsService:SettingsService){}

	checkBeforeCleanDB(){
		this.checkClean = true;
	}

	yesCleanDB(){
		this.cleanDB();
	}

	noCleanDB(){
		this.checkClean = false;
	}

	cleanDB(){
		this.settingsService.truncateAllVideos()
		.subscribe(
			response => this.truncateResponse = response,
			error => console.log(error)
			);
	}

	restartFileWatcher(){
		console.log("Restart File watcher");
	}

}