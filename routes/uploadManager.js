var fs = require('fs');


var mongoose = require('mongoose');
var express = require('express');
var router = express.Router();

router.get('/:id', function(req, res, next) {
	res.json({'id': req.params.id,'err':'make a post request'});
});

router.post('/:id', function(req,res,next){
	if(req.params.id === undefined || req.params.id === "" ){
		res.status(500).send({'err':'ID_ERR'});
		return;
	} 

	if(req.files['file'].mimetype !== "image/jpeg"){
		fs.unlink(req.files['file'].path, function(){
			res.status(500).send({'err':'file_rejected'})
		});
		return;
	}

	fs.exists('./storage/' + req.params.id, function(exists){
		if(!exists){
			fs.mkdirSync('./storage/'+req.params.id);
		}
		fs.rename(req.files['file'].path, './storage/'+req.params.id+'/'+req.files['file']['originalname'], function(){
			res.json({'id': req.params.id, 'success':true});
		});
	});

	
});

module.exports = router;