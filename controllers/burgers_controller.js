var express = require('express');
var burger = require('../models/burgers.js');
var router = express.Router();

router.get('/', function(req,res) {
	res.redirect('/burgers');
});

router.get('/burgers', function(req,res) {
	burger.all(function(data){
		var bgdata = {burgers : data};
		console.log(bgdata);
		res.render('index', bgdata);
	});
});

router.post('/burgers/create', function(req,res) {
	burger.create(['burger_name', 'devoured'], [req.body.burger_name, req.body.devoured], function(data){
		res.redirect('/burgers');
	});
});

router.put('/burgers/update/:id', function(req,res) {
	var condition = 'id = ' + req.params.id;

	console.log('condition', condition);

	burger.update({'devoured' : req.body.devoured}, condition, function(data){
		res.redirect('/burgers');
	});
});

module.exports = router;
