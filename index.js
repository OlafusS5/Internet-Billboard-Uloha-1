var file = './tmp/data.json';
var server = require('./lib/server');
var filejson = require('./lib/filejson');
var redis = require('./lib/redis');

server.start(process);

function process(queryData, response, callback) {
	
	if(isEmpty(queryData)) callback(response, 400);
	
	else {
		var basket = { count: false,
					 json:false,
					 response:response};
		if(queryData.count) {
			redis.add(queryData.count, end, basket);
		} else basket.json = true;
		filejson.write(queryData, end, basket);
	}
}
function end(err, reply, basket) {
	if (basket.count && basket.json) 
		server.respond(basket.response,200);
	else if (basket.count === "Error" && basket.json)
		server.respond(basket.response,200);
	else if ((basket.count === "Error" || basket.count)
		&& basket.json=== "Error")
		server.respond(basket.response,500);
}


function isEmpty(obj) {
    if (obj == null) return true;
    if (obj.length > 0)    return false;
    if (obj.length === 0)  return true;

    for (var key in obj) {
        if (hasOwnProperty.call(obj, key)) return false;
    }
    

    return true;
}
exports.process = process;
exports.end = end;