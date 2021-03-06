//Require some libraries
var sys = require('sys'),
	http = require('http'),
	Buffer = require('buffer').Buffer,
	fs = require('fs'),
	geoip = require('geoip');

//Setup some basic variables
var log = sys.puts,
	server,
	socket,
	clients,
	port = 4134,
	i = 0;
	
//Set up our pixel data
var pixel = new Buffer(43);
pixel.write(fs.readFileSync(__dirname + "/images/tracking.gif", 'binary'), 'binary', 0);

//------------------------------------------------------------------------------------------------------------------------------------

//setup the http server
server = http.createServer(function(req, res){
	
	//serve the transparent pixel
	res.writeHead(200, {
		'Content-Type': 'image/gif',
   	'Content-Disposition': 'inline',
   	'Content-Length': '43' 
   });
   res.end(pixel);	
   
   var queryStr = req.url.split("?");

	//if the request is for what we want it to be for, handle it   
   if(queryStr[0] == "/track.it"){
   	i++;

   	//we can utilize mongodb to actually store the requests
   	
   	
  		//as of now, env only stores the time/date and the remote IP. this will hopefully be expanded eventually, to include location, cookies, and more
		var env = {};
   	env.timestamp = new Date();
   	env.ip = req.connection.remoteAddress;
   	env.data = queryStr[1].split("&");

		//spit some output		
		log('[' + i + '] ' + env.timestamp + ': hit recorded from ' + env.ip);
		console.dir(env);
		log('\n');
	}
});

server.listen(port);
log('\n' + 'Server is now listening for new connections on port ' + port + '\n' + '------------------------------------------------------------------' + '\n');