var express = require("express"); 
var router = express.Router(); 
var passport = require("passport"); 
var Score = require("../models/score"); //correct path? 
var User = require("../models/user"); //may need for score association

//index
router.get("/", function(req, res) {
	res.render("games/index"); 
});

//games
router.get("/multiplication", function(req, res) {
	Score.find({game:"Hanson Multiplication Game"}, function(err, allscores) {
		if(err)
			{
				console.log(err);
				req.flash("error", "No Scores"); 
				res.redirect("games/multiplication"); 
			}
		else
			{
				res.render("games/multiplication", {scores:allscores}); 
			}
	});
	//res.render("games/multiplication");  
}); 

router.get("/division", function(req, res) {
	Score.find({game:"Hanson Division Game"}, function(err, allscores) {
		if(err)
			{
				console.log(err);
				req.flash("error", "No Scores Yet"); 
				res.redirect("games/division"); 
			}
		else
			{
				res.render("games/division", {scores:allscores}); 
			}
	});
	//res.render("games/division");  
}); 

router.get("/rounding", function(req, res) {
	res.render("games/rounding");  
}); 

router.get("/convertingunits", function(req, res) {
	res.render("games/convertingunits");  
}); 

router.get("/wordform", function(req, res) {
	res.render("games/wordform");  
}); 

router.get("/primecomposite", function(req, res) {
	res.render("games/primecomposite");  
}); 

router.get("/primenumbergenerator", function(req, res) {
	res.render("games/primenumbergenerator");  
}); 

router.get("/equivalentfractionmaker", function(req, res) {
	res.render("games/equivalentfractionmaker");  
}); 

router.get("/simplifiedfractiongenerator", function(req, res) {
	res.render("games/simplifiedfractiongenerator");  
}); 

router.get("/preparelongdivision", function(req, res) {
	res.render("games/preparelongdivision");  
}); 

router.get("/divisionremainders", function(req, res) {
	res.render("games/divisionremainders");  
}); 

//get score form
router.get("/submit", function(req, res) {
	console.log("this is the post show route");  //later, show form that will have post route, and then in score.ejs(or something similar, allow user to submit score, passing in unique id to make url unique. later make sure it is authenticated, and signed in)
	
	
	res.render("games/submit"); //only works when logged in currently 
	
}); 

router.post("/submit", function(req, res) {
	//var score = req.body.score; 
	/*
	var author = {
		id: req.user._id,
		username: req.user.username
	}; 
	*/
	//var newScore = {score:score, author:author}; 
	var newScore = new Score({
		score:req.body.score,
		author:{
			id: req.user._id,
			username:req.user.username
		},
		game:req.body.game
	});
	//newScore.save(); 
	//console.log(newScore.value); 
	//res.send("this is the post route"); 
	//console.log("value: " + score); 
	//console.log("newScore: " + newScore); 
	//console.log("author: " + author.id + "," + author.username); 
	Score.create(newScore, function(err, createdScore) {
		if(err)
			{
				console.log(err); 
				req.flash("error", err.message); 
				return res.redirect("back"); 
			}
		req.flash("success", "New Score Logged"); 
		res.redirect("back"); 
	});
	/*
	var newScore = new Score({
		value:req.body.value
	});
	newScore.save(); 
	console.log(newScore.value); 
	res.send("this is the post route"); 
	*/
}); 

module.exports = router; 