var file = './tmp/data.json';
var os = require('os');
var fs = require('fs');

function write(wrt, callback, basket) {
	wrt = JSON.stringify(wrt) + os.EOL;
	fs.appendFile(file, wrt, function (err) {
        if (err) {
        	basket.json = "Error";
            callback(err, null, basket);
        } else {
        	basket.json = true;
        	callback(null,"JSON file writen.", basket);
        }
    });
}
exports.write = write;