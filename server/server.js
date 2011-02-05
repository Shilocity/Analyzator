//Require our libraries
var sys = require('sys'),
	http = require('http'),
	//url = require('url'),
	Buffer = require('buffer').Buffer,
	fs = require('fs'),
	geoip = require('geoip');

//Setup some basic variables
var log = sys.puts,
	server,
	socket,
	clients,
	port = 4134; //one may more reasonably choose for this to run on port 80
	
//Set up our pixel data
var pixel = new Buffer(43);
pixel.write(fs.readFileSync(__dirname + "/images/tracking.gif", 'binary'), 'binary', 0);
var i = 0;

//splitQuery function
/*
var splitQuery = function(query) {
    var queryString = {};
    (query || "").replace(
      new RegExp("([^?=&]+)(=([^&]*))?", "g"),
      function($0, $1, $2, $3) { queryString[$1] = querystring.unescape($3.replace(/\+/g, ' ')); }
    );
}
*/

//we need to setup the http server
server = http.createServer(function(req, res){
	//serve the transparent pixel
	res.writeHead(200,
	{ 
		'Content-Type': 'image/gif',
   	'Content-Disposition': 'inline',
   	'Content-Length': '43' 
   });
   res.end(pixel);	
   
   if(req.url != undefined && req.url != "/favicon.ico"){
   	i++;
   
  		//as of now, env only stores the time/date and the remote IP. this will hopefully be expanded eventually, to include location, cookies, and more
		var env = {};   	
   	env.timestamp = new Date();
   	env.ip = req.connection.remoteAddress;
   	env.url = req.url;
		log(i + '] ' + env.timestamp + ': hit recorded from ' + env.ip + ', requesting path "' + env.url + '"' + '\n\n');
	}
});

server.listen(port);
log('\n' + 'Server is now listening for new connections on port ' + port + '\n' + '------------------------------------------------------------------' + '\n');