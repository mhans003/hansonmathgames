var express = require("express"); 
var router = express.Router(); 
var passport = require("passport"); 
var Score = require("../models/score"); //correct path? 
var User = require("../models/user"); //correct path? 
var async = require("async"); 
var nodemailer = require("nodemailer"); 
var crypto = require("crypto"); 

var middleware = require("../middleware");

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
				return res.render("register", {error: err.message});
			}
		passport.authenticate("local")(req, res, function() {
			req.flash("success", "Successfully Signed Up! Nice to meet you, " + req.body.username);
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
		failureRedirect: "/login",
		successFlash: "Successfully logged in",
		failureFlash: true
	}), function(req, res) {
}); 

//logout 
router.get("/logout", function(req, res) {
	req.logout(); 
	req.flash("success", "Signed Out"); 
	res.redirect("/"); 
});

//profile

router.get("/profile", middleware.isLoggedIn, function(req, res) {
	//Score.find({{author.username:}})
}); 

//forgot password

router.get("/forgot", function(req, res) {
	res.render("forgot"); 
}); 

router.post("/forgot", function(req, res, next) {
	async.waterfall([
		function(done) {
			crypto.randomBytes(20, function(err, buf) {
				var token = buf.toString("hex"); 
				done(err, token); 
			});
		}, 
		function(token, done) {
			User.findOne({email:req.body.email}, function(err, user) {
				if(!user) 
				{
					req.flash("error", "No account with that email exists"); 
					return res.redirect("/forgot"); 
				}
				user.resetPasswordToken = token; 
				user.resetPasswordExpires = Date.now() + 3600000; //1 hour
				
				user.save(function(err) {
					done(err, token, user); 
				});
			});
		},
		function(token, user, done) {
			var smtpTransport = nodemailer.createTransport({
				service: "Gmail",
				auth: {
					user: "hansonmathgames@gmail.com",
					pass: process.env.GMAILPW
					//pass: GMAILPW
				}
			}); 
			//console.log(process.env.GMAILPW); //see if saved/shows up
			var mailOptions = {
				to: user.email,
				from: "hansonmathgames@gmail.com",
				subject: "Password Reset",
				text: "Click on following link to reset: " + "http://" + req.headers.host + "/reset/" + token + "\n" 
			};
			smtpTransport.sendMail(mailOptions, function(err) {
				console.log("mail sent"); 
				req.flash("success", "An email has been sent to " + user.email + " with further instructions."); 
				done(err, "done"); 
			}); 
		}
	], function(err) {
		if (err) return next(err); 
		res.redirect("/forgot"); 
	}); 
}); 

//handle password reset (from email)
router.get("/reset/:token", function(req, res) {
	User.findOne({resetPasswordToken:req.params.token,resetPasswordExpires:{$gt:Date.now()}}, function(err, user) {
		if(!user) 
			{
				req.flash("error", "Password reset token is invalid or is expired."); 
				return res.redirect("/forgot"); 
			}
		res.render("reset", {token:req.params.token}); 
	});
});

router.post("/reset/:token", function(req, res) {
	async.waterfall([
		function(done) {
			User.findOne({resetPasswordToken: req.params.token, resetPasswordExpires:{$gt:Date.now()}}, function(err, user) {
				if(!user) 
					{
						req.flash("error", "Password reset token is invalid or expired.");
						return res.redirect("back"); 
					}
				if(req.body.password === req.body.confirm) 
					{
						user.setPassword(req.body.password, function(err) {
							user.resetPasswordToken = undefined; 
							user.resetPasswordExpires = undefined; 
							
							user.save(function(err) {
								req.logIn(user, function(err) {
									done(err, user);
								});
							});
						});
					}
				else
					{
						req.flash("error", "Passwords do not match"); 
						return res.redirect("back"); 
					}
			});
		},
		function(user, done) {
			var smtpTransport = nodemailer.createTransport({
				service: "Gmail",
				auth: {
					user: "hansonmathgames@gmail.com",
					pass: process.env.GMAILPW
				}
			});
			var mailOptions = {
				to: user.email,
				from: "hansonmathgames@gmail.com",
				subject: "Password Changed",
				text: "This confirms that password for " + user.email + " has just changed.\n"
			};
			smtpTransport.sendMail(mailOptions, function(err) {
				req.flash("success", "Password Changed"); 
				done(err); 
			}); 
		}
	], function(err) {
		res.redirect("/"); 
	}); 
});

module.exports = router; 