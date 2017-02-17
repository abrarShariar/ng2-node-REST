import { Component } from '@angular/core';

@Component({
	selector: '',
	templateUrl: './settings.component.html',
	styleUrls: ['./settings.component.css']
})
export class SettingsComponent{
	title:string = "Settings";

	cleanDB(){
		console.log("CLEAN DB");
	}

	restartFileWatcher(){
		console.log("Restart File watcher");
	}

}