var vows = require('vows'),
    assert = require('assert');

var filejson = require('../lib/filejson');
var obj = {dog: 'Fabri'};

vows.describe('JSON Test').addBatch({
	'Test write to json' : {
		topic: function () {
			filejson.file = '../tmp/data.json';
			filejson.write({dog: 'Fabri'}, this.callback, {json:false});
		}
	, 'should respond with JSON file writen.': function (err, res) {
		assert.isNull(err);
		assert.equal(res, "JSON file writen.");
		}
	}
}).export(module);