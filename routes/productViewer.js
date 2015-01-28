
var fs = require('fs');


var mongoose = require('mongoose');
var express = require('express');
var router = express.Router();

router.get('/:id/:count', function(req, res, next) {
	fs.exists('./storage/'+req.params.id+'/'+req.params.count+'.jpg', function(exists){
		if(exists)
			res.sendFile('./storage/'+req.params.id+'/'+req.params.count+'.jpg', {root:__dirname+'/..'});
		else
			res.status(404).send({'err':'missing file'});
	});
});


module.exports = router;