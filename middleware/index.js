var User = require("../models/user"); 
var Score = require("../models/score"); 

var middlewareObject = {}; 

middlewareObject.isLoggedIn = function(req, res, next) {
	if(req.isAuthenticated()) 
		{
			return next(); 
		}
	req.flash("error", "You must be logged in."); //passes to routes/index.js - to login route
	res.redirect("/login");
}

middlewareObject.middlewareTest = function(req, res, next) {
	console.log("middleware test"); 
	return next(); 
}
/*
middlewareObject.getScores = function(req, res, next) {
	Score.find({game:req.params.},{},{"sort":"score"}, function(err, allscores) {
		if(err)
			{
				console.log(err);
				res.redirect("back"); 
			}
		else
			{
				return next(allscores); 
			}
	});
}
*/
module.exports = middlewareObject; 