var vows = require('vows'),
    assert = require('assert'),
    _redis = require('redis');
var client = _redis.createClient();

var redis = require('../lib/redis');

client.set('count', 0);


vows.describe('Redis Test').addBatch({
	'Test pridani cisla 2' : {
		topic: function () {redis.add(2,this.callback,
				{count:false});
			},
		 'should respond with a value added by 2': 
			 function (err, reply, basket) {
			assert.isNull(err);
			assert.equal(reply, 2);
			assert.isTrue(basket.count);
		}
	},
	'Test pridani cisla -1' : {
		topic: function () {redis.add(-1,this.callback,
				{count:false});
			},
		 'should respond with a value 1': 
			 function (err, reply, basket) {
			assert.isNull(err);
			assert.equal(reply, 1);
			assert.isTrue(basket.count);
		}
	},
	'Test pridani null' : { 
		topic: function() { 
			redis.add(null,this.callback, {count:false});
		},
		'should return exception': function (err, topic, basket)
		{
			assert.isString(err);
			assert.isString(basket.count);
			assert.isNull(topic);
		}
	},
	'Test pridani Stringu' : { 
		topic: function() {
			redis.add("Hodnota",this.callback, {count:false});
		},
		'should return exception': function (err, topic, basket)
		{
			assert.isString(err);
			assert.isString(basket.count);
			assert.isNull(topic);
		}
	},
	'Test cteni get z Redis' : {
		topic: function () {
			client.get("count", this.callback);
			},
		'should return "count" value': function (err, count) {
			assert.isNull(err);
			console.log("Hodnota cteni je " + count);
			assert.isString(count);
		}
	}

}).export(module);