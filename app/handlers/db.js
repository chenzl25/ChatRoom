var config = require("../config.js").config;
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;
var url = config.url || 'mongodb://localhost:27017/web';
var database = '';
exports.init = function(callback) {
    MongoClient.connect(url, function(err, db) {
        if (err) {
            callback(err);
        } else {
            assert.equal(null, err);
            database = db;
            callback(null);
        }
    });
}
exports.add_account = function(data, callback) {
    var cursor = database.collection('accounts').find({'account' : data.account});
    var cnt = 0;
    cursor.each(function(err, doc) {
        assert.equal(err, null);
        if (doc != null) {
            cnt++;
        } else {
        	if (cnt == 0) {
			    database.collection('accounts').insertOne(data, function(err, result) {
			        assert.equal(err, null);
			        callback(true);
		    	});
        	} else {
            	callback(false);
        	}
        }
    });
};
exports.login = function(data, callback) {
	var cursor = database.collection('accounts').find({'account' : data.account});
	var cnt = 0;
    var ps = '';
    cursor.each(function(err, doc) {
        assert.equal(err, null);
		if (doc != null) {
            ps = doc.password;
        } else {
			if (ps == data.password) {
				callback(true);
			} else {
				callback(false);
			}
		}
	});
}
