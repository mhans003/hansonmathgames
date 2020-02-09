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

module.exports = middlewareObject