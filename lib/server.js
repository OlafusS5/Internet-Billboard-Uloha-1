var http = require("http");
var url = require("url");
var querystring = require("querystring");

function start(callback) {
  function onRequest(request, response) {
    var pathname = url.parse(request.url).pathname;
    console.log("Request for " + pathname + " received.");
    if(pathname === "/track") {
    	var queryData = url.parse(request.url, true).query;
    	callback(queryData, response, respond);
       
    } else {
    	respond(response,501);
    }
}

  http.createServer(onRequest).listen(8888);
  console.log("Server has started.");
}
function respond(response, statusCode) {
	response.statusCode = statusCode;
    response.end();
}

exports.start = start;
exports.respond = respond;
