const chokidar = require('chokidar');
const imdb = require('imdb-api');
const mysql = require('mysql');
var exports = module.exports = {};
let watcher;

//create connection
let connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'root',
	database: 'movieDB'
});
//check connection
connection.connect(function(err) {
	if (err) {
		console.error('error connecting: ' + err.stack);
		return;
	}
	console.log('connected as id ' + connection.threadId);
});


/*
*	function to keep watching filesystem recursively for changes
*/
exports.startFileWatcher = function(){

	let file_ext = ['mkv','mp4','flv','wmv','mov'];
	watcher = chokidar.watch('.', {ignored: /[\/\\]\./}).on('all', (event, path) => {
		let full_path = path;
		let separated_path = full_path.split('/');
		let last_item = separated_path[separated_path.length - 1];
		let ext = last_item.split('.');
		let check = false;
		file_ext.map(function(element){
			if(element === ext[ext.length - 1]){
				check = true;
			}
		});	
	//for add event
	if(event == 'addDir' || event == 'add'){
		//get data from imdb api
		if(check){
			let name = separated_path[separated_path.length - 2];
			let type = separated_path[separated_path.length - 3];
			let imdb_data;
			let title = name;
			let released = '';
			let runtime = '';
			let genres = '';
			let director = '';
			let writer = '';
			let actors = '';
			let plot = '';
			let languages = '';
			let country = '';
			let awards = '';
			let poster = '';
			let rating = '';
			let votes = '';
			let imdburl = '';

			//check if data already exists in DB
			connection.query('SELECT title FROM `all_videos` WHERE `title` = ?', [title] , function(error, results, fields){
				console.log(results.length);
				// item does not exist in DB
				if(results.length === 0){
					imdb.getReq({ name: name })
					.then(function(res){
						title = name;
						released = res['released'];
						runtime = res['runtime'];
						genres = res['genres'];
						director = res['director'];
						writer = res['writer'];
						actors = res['actors'];
						plot = res['plot'];
						languages = res['languages'];
						country = res['country'];
						awards = res['awards'];
						poster = res['poster'];
						rating = res['rating'];
						votes = res['votes'];
						type = res['type'];
						imdburl = res['imdburl'];	
						//insert data into DB
						let data = { title:title, plot: plot, type:type, languages:languages, genres:genres, video_path:full_path, released:released, runtime:runtime, director:director, writer:writer, actors:actors, country: country, awards:awards, poster:poster, rating: rating, votes: votes, imdburl:imdburl };						let query = connection.query('INSERT INTO all_videos SET ? ', data, function (error, results, fields) {
							if (error) throw error;
						});
						console.log(query.sql);
					},function(err){
						console.log("ERROR");
						// insert data into DB
						let data = { title:title, plot: plot, type:type, languages:languages, genres:genres, video_path:full_path, released:released, runtime:runtime, director:director, writer:writer, actors:actors, country: country, awards:awards, poster:poster, rating: rating, votes: votes, imdburl:imdburl };
						let query = connection.query('INSERT INTO all_videos SET ? ', data, function (error, results, fields) {
							if (error) throw error;
						});
						console.log(query.sql);
					});
				}else{
					//item exist in DB
					console.log(title + ' EXISTS IN DB');
				}
			});
		}
	}
	//for delete event
	if(event == 'unlink' || event == 'unlinkDir'){
		if(check){
			let del_name = separated_path[separated_path.length - 2];
			//delete data from DB
			let query = connection.query('DELETE FROM `all_videos` WHERE `title` = ?', [del_name] ,function (error, results, fields) {
				if (error) throw error;
			});
			console.log(query.sql);
		}
	}
});
}

/*
*	function for stopping file watcher
*/
exports.stopFileWatcher = function(){
	if(watcher.close()){
		return true;
	}else{
		return false;
	}
}

