var redis = require('redis');
var client = redis.createClient(); //creates a new client 

client.on("error", function (err) {
    console.log("Error " + err);
});

function add(count, callback, basket) {
	count = parseInt(count);
	if(isNaN(count)) {
		basket.count = "Error";
		callback("Count is NaN",null, basket);
	} else {
		client.exists('count', function(err, reply) {
		    if (reply === 1) {
		    	increment(count, callback, basket);
		    } else {
		    	client.set('count', 0);
		        increment(count, callback, basket);
		        
		    }
		});
	}
}

function increment(count, callback, basket) {
		
		client.incrby('count', count, function(err, reply) {
			basket.count = true;
			callback(null,reply, basket);
    });

}

function get(key, callback) {
	client.get(key, function(err, reply){
		callback(null,reply);
	});
}

exports.add = add;
exports.get = get;