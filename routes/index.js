let express = require("express"); 
let router = express.Router(); 
let passport = require("passport"); 
let Score = require("../models/score"); //correct path? 
let User = require("../models/user"); //correct path? 
let async = require("async"); 
let nodemailer = require("nodemailer"); 
let crypto = require("crypto"); 

let middleware = require("../middleware");

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
	//access code added. to remove, remove if/else statement
	if(req.body.accessCode === process.env.ACCESSCODE)
		{
			//console.log(req.body); 
			
			if(req.body.password !== req.body.confirmPassword)
				{
					req.flash("error", "Passwords don't match");
					return res.redirect("register");
				}
			
			let newUser = new User({
				username:req.body.username,
				firstName:req.body.firstName,
				lastName:req.body.lastName,
				email:req.body.email
			});

			if(req.body.adminCode === process.env.ADMINCODE)
				{
					newUser.isAdmin = true; 
				}

			//add admin manually into database later.

			User.register(newUser, req.body.password, function(err, user) {
				if(err)
					{
						console.log(err); 
						let errorMessage = (err.code === 11000) ? "Email already registered" : err.message;
						return res.render("register", {error: errorMessage});
					}
				passport.authenticate("local")(req, res, function() {
					req.flash("success", "Successfully Signed Up! Nice to meet you, " + req.body.username);
					res.redirect("/games"); 
				});
			}); 
		}
	else
		{
			req.flash("error", "Incorrect access code. Ask Mr. Hanson.");
			res.redirect("register"); 
		}
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

//userscores page
router.get("/userscores", function(req, res) {
	Score.find({},{},{"sort":"score"}, function(err, allscores) {
		if(err)
			{
				console.log(err); 
				res.redirect("back"); 
			}
		else
			{
				//console.log(allscores); 
				res.render("userscores", {scores:allscores}); 
			}
	});
});

//profile

router.get("/profile", middleware.isLoggedIn, function(req, res) {

}); 

//forgot password

router.get("/forgot", function(req, res) {
	res.render("forgot"); 
}); 

router.post("/forgot", function(req, res, next) {
	async.waterfall([
		function(done) {
			crypto.randomBytes(20, function(err, buf) {
				let token = buf.toString("hex"); 
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
			let smtpTransport = nodemailer.createTransport({
				service: "Gmail",
				auth: {
					user: "hansonmathgames@gmail.com",
					pass: process.env.GMAILPW
					//pass: GMAILPW
				}
			}); 
			//console.log(process.env.GMAILPW); //see if saved/shows up
			let mailOptions = {
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
			let smtpTransport = nodemailer.createTransport({
				service: "Gmail",
				auth: {
					user: "hansonmathgames@gmail.com",
					pass: process.env.GMAILPW
				}
			});
			let mailOptions = {
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