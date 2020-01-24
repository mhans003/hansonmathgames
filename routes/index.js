var express = require("express"); 
var router = express.Router(); 
var passport = require("passport"); 
var User = require("../models/user"); //correct path? 

//root
router.get("/", function(req, res) {
	res.render("main"); 
});

//AUTHENTICATION

//register
router.get("/register", function(req, res) {
	res.render("register"); //inc. - see reference
}); 

router.post("/register", function(req, res) {
	console.log(req.body); 
	var newUser = new User({
		username:req.body.username,
		firstName:req.body.firstName,
		lastName:req.body.lastName,
		email:req.body.email
	});
	
	if(req.body.adminCode === "secretcode123")
		{
			newUser.isAdmin = true; 
		}
	
	//add admin manually into database later
	
	User.register(newUser, req.body.password, function(err, user) {
		if(err)
			{
				console.log(err); 
				return res.render("register"); 
			}
		passport.authenticate("local")(req, res, function() {
			res.redirect("/games"); 
		});
	}); 
}); 

//login
router.get("/login", function(req, res) {
	res.render("login"); //inc. - see reference
}); 

router.post("/login", passport.authenticate("local", 
	{
		successRedirect: "/games",
		failureRedirect: "/login"
	}), function(req, res) {
}); 

//logout 
router.get("/logout", function(req, res) {
	req.logout(); 
	//req.flash("success", "Logged Out"); 
	res.redirect("/games"); 
});

module.exports = router; 