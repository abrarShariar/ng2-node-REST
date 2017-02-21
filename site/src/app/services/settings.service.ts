import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Video } from '../classes/Video';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

/*
* service for settings options
*/

@Injectable()
export class SettingsService{
	private truncateAllVideosApi = 'http://localhost:8080/api/truncate/all_videos';
	private fileWatcherStartApi = 'http://localhost:8080/api/file_watcher/start';

	constructor(private http: Http){}

	//get all video data 
	truncateAllVideos(): Observable<any[]>{
		return this.http.get(this.truncateAllVideosApi)
		.map(this.extractData)
		.catch(this.handleError);
	}

	private extractData(res: Response){
		let body = res.json();
		return body || { };
	}

	//error handling
	private handleError(error: Response | any){
		// In a real world app, we might use a remote logging infrastructure
		let errMsg: string;
		if (error instanceof Response) {
			const body = error.json() || '';
			const err = body.error || JSON.stringify(body);
			errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
		} else {
			errMsg = error.message ? error.message : error.toString();
		}
		console.error(errMsg);
		return Observable.throw(errMsg);
	}	




}