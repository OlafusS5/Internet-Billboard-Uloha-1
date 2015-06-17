var vows = require('vows'),
    assert = require('assert'),
    client = require('http');

vows.describe('Server Test').addBatch({
	'Test routy track' : {
		topic: function () {
				client.get({
				  hostname: 'localhost',
				  port: 8888,
				  path: '/track' 
				}, this.callback);
			}
		, 'should respond with a 400 ': function (res, e) {
			//assert.isNull(e);
			assert.equal(res.statusCode, 400);
		}
	},
	'Test jine routy' : { 
		topic: function () {
			client.get({
				  hostname: 'localhost',
				  port: 8888,
				  path: '/' 
				}, this.callback);
		}, 'should respond with a 501 Not Implemented': function (res, e) {
			//assert.isNull(e);
			assert.equal (res.statusCode, 501);
		}
	},
	'Test routy track s parametrem' : { 
		topic: function () {
			client.get({
				  hostname: 'localhost',
				  port: 8888,
				  path: '/track?count=1&hello="world"' 
				}, this.callback);
		}, 'should respond with a 200 OK': function (res, e) {
			//assert.isNull(e);
			assert.equal (res.statusCode, 200);
		}
	}
}).export(module);