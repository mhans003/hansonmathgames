let express = require("express"); 
let router = express.Router(); 
let passport = require("passport"); 
let Score = require("../models/score"); //correct path? 
let User = require("../models/user"); //may need for score association

let middleware = require("../middleware");

//index
router.get("/", middleware.isLoggedIn, function(req, res) {
	res.render("games/index"); 
});

//games
router.get("/multiplication", middleware.isLoggedIn, function(req, res) {
	Score.find({game:"Hanson Multiplication Game"},{},{"sort":"score"}, function(err, allscores) {
		if(err)
			{
				console.log(err);
				res.redirect("back"); 
			}
		else
			{
				Score.find({game:"Hanson Multiplication Game",author:req.user.username},{},{"sort":"score"}, function(err, userscores) {
					if(err)
						{
							console.log(err); 
							res.redirect("back"); 
						}
					else
						{
							//console.log(allscores); 
							res.render("games/multiplication", {scores:allscores,userScores:userscores}); 
						}
				}); 
				//console.log(allscores); 
				//res.render("games/multiplication", {scores:allscores}); 
			}
	});
}); 
/*
router.get("/multiplicationrefactored", middleware.isLoggedIn, function(req, res) {
	Score.find({game:"Hanson Multiplication Game"},{},{"sort":"score"}, function(err, allscores) {
		if(err)
			{
				console.log(err);
				res.redirect("back"); 
			}
		else
			{
				Score.find({game:"Hanson Multiplication Game",author:req.user.id},{},{"sort":"score"}, function(err, userscores) {
					if(err)
						{
							console.log(err); 
							res.redirect("back"); 
						}
					else
						{
							console.log(userscores); 
							res.render("games/refactors/multiplicationrefactored", {scores:allscores,userScores:userscores}); 
						}
				}); 
				//res.render("games/multiplication", {scores:allscores}); 
			}
	});
}); 
*/


router.get("/multiplicationrefactored", middleware.isLoggedIn, function(req, res) {
	Score.find({game:"Hanson Multiplication Game"},{},{"sort":"score"}, function(err, allscores) {
		if(err)
			{
				console.log(err);
				res.redirect("back"); 
			}
		else
			{
				res.render("games/refactors/multiplicationrefactored", {scores:allscores}); 
			}
	});
});

/*
router.get("/multiplicationrefactored", middleware.isLoggedIn, function(req, res) {
	
	let usersHighestScore = Score.findOne({game:"Hanson Multiplication Game"},{},{"sort":"score"}); 
	let allscores = Score.find({game:"Hanson Multiplication Game"},{},{"sort":"score"}); 
	Score.find({game:"Hanson Multiplication Game"},{},{"sort":"score"}, function(err, allscores) {
		if(err)
			{
				console.log(err);
				res.redirect("back"); 
			}
		else
			{
				console.log(allscores); 
				res.render("games/refactors/multiplicationrefactored", {scores:allscores}); 
			}
	});
}); 
*/
router.get("/multiplicationpowersoften", middleware.isLoggedIn, function(req, res) {
	Score.find({game:"Hanson Multiplication Game Powers of Ten"},{},{"sort":"score"}, function(err, allscores) {
		if(err)
			{
				console.log(err);
				res.redirect("back"); 
			}
		else
			{
				res.render("games/refactors/multiplicationpowersoften", {scores:allscores}); 
			}
	});
}); 

router.get("/division", middleware.isLoggedIn, function(req, res) {
	Score.find({game:"Hanson Division Game"},{},{"sort":"score"}, function(err, allscores) {
		if(err)
			{
				console.log(err);
				res.redirect("back"); 
			}
		else
			{
				res.render("games/division", {scores:allscores}); 
			}
	});
}); 

router.get("/divisionrefactored", middleware.isLoggedIn, function(req, res) {
	Score.find({game:"Hanson Division Game"},{},{"sort":"score"}, function(err, allscores) {
		if(err)
			{
				console.log(err);
				res.redirect("back"); 
			}
		else
			{
				res.render("games/refactors/divisionrefactored", {scores:allscores}); 
			}
	});
}); 

router.get("/rounding", middleware.isLoggedIn, function(req, res) {
	Score.find({game:"Hanson Rounding Game"},{},{"sort":"score"}, function(err, allscores) {
		if(err)
			{
				console.log(err); 
				res.redirect("back"); 
			}
		else
			{
				res.render("games/rounding", {scores:allscores}); 
			}
	}); 
}); 

router.get("/roundingrefactored", middleware.isLoggedIn, function(req, res) {
	Score.find({game:"Hanson Rounding Game"},{},{"sort":"score"}, function(err, allscores) {
		if(err)
			{
				console.log(err); 
				res.redirect("back"); 
			}
		else
			{
				res.render("games/refactors/roundingrefactored", {scores:allscores}); 
			}
	}); 
}); 

router.get("/convertingunits", middleware.isLoggedIn, function(req, res) {
	Score.find({game:"Hanson Converting Units Game"},{},{"sort":"score"}, function(err, allscores) {
		if(err)
			{
				console.log(err);
				res.redirect("back"); 
			}
		else
			{
				res.render("games/convertingunits", {scores:allscores}); 
			}
	}); 
}); 

router.get("/convertingunitsrefactor", middleware.isLoggedIn, function(req, res) {
	Score.find({game:"Hanson Converting Units Game"},{},{"sort":"score"}, function(err, allscores) {
		if(err)
			{
				console.log(err);
				res.redirect("back"); 
			}
		else
			{
				res.render("games/refactors/convertingunitsrefactor", {scores:allscores}); 
			}
	}); 
});

router.get("/convertingunitsmetric", middleware.isLoggedIn, function(req, res) {
	Score.find({game:"Hanson Converting Units Game Metric"},{},{"sort":"score"}, function(err, allscores) {
		if(err)
			{
				console.log(err);
				res.redirect("back"); 
			}
		else
			{
				res.render("games/refactors/convertingunitsmetric", {scores:allscores}); 
			}
	}); 
}); 

router.get("/wordform", middleware.isLoggedIn, function(req, res) {
	res.render("games/wordform");  
}); 

router.get("/wordformtraditional", middleware.isLoggedIn, function(req, res) {
	res.render("games/wordformtraditional");  
}); 

router.get("/primecomposite", middleware.isLoggedIn, function(req, res) {
	Score.find({game:"Hanson Prime/Composite Numbers Game"},{},{"sort":"score"}, function(err, allscores) {
		if(err)
			{
				console.log(err);
				res.redirect("back"); 
			}
		else
			{
				res.render("games/primecomposite", {scores:allscores}); 
			}
	}); 
}); 

router.get("/primecompositerefactored", middleware.isLoggedIn, function(req, res) {
	Score.find({game:"Hanson Prime/Composite Numbers Game"},{},{"sort":"score"}, function(err, allscores) {
		if(err)
			{
				console.log(err);
				res.redirect("back"); 
			}
		else
			{
				res.render("games/refactors/primecompositerefactored", {scores:allscores}); 
			}
	}); 
}); 

router.get("/primenumbergenerator", middleware.isLoggedIn, function(req, res) {
	res.render("games/primenumbergenerator");  
}); 

router.get("/equivalentfractionmaker", middleware.isLoggedIn, function(req, res) {
	res.render("games/equivalentfractionmaker");  
}); 

router.get("/simplifiedfractiongenerator", middleware.isLoggedIn, function(req, res) {
	res.render("games/simplifiedfractiongenerator");  
}); 

router.get("/preparelongdivision", middleware.isLoggedIn, function(req, res) {
	Score.find({game:"Hanson Preparing for Long Division Game"},{},{"sort":"score"}, function(err, allscores) {
		if(err)
			{
				console.log(err);
				res.redirect("back"); 
			}
		else
			{
				res.render("games/preparelongdivision", {scores:allscores}); 
			}
	});  
}); 

router.get("/preparelongdivisionrefactored", middleware.isLoggedIn, function(req, res) {
	Score.find({game:"Hanson Preparing for Long Division Game"},{},{"sort":"score"}, function(err, allscores) {
		if(err)
			{
				console.log(err);
				res.redirect("back"); 
			}
		else
			{
				res.render("games/refactors/preparelongdivisionrefactored", {scores:allscores}); 
			}
	});  
}); 

router.get("/divisionremainders", middleware.isLoggedIn, function(req, res) {
	Score.find({game:"Hanson Division Game With Remainders"},{},{"sort":"score"}, function(err, allscores) {
		if(err)
			{
				console.log(err);
				res.redirect("back"); 
			}
		else
			{
				res.render("games/divisionremainders", {scores:allscores}); 
			}
	}); 
}); 

router.get("/divisionremaindersrefactored", middleware.isLoggedIn, function(req, res) {
	Score.find({game:"Hanson Division Game With Remainders"},{},{"sort":"score"}, function(err, allscores) {
		if(err)
			{
				console.log(err);
				res.redirect("back"); 
			}
		else
			{
				res.render("games/refactors/divisionremaindersrefactored", {scores:allscores}); 
			}
	}); 
}); 

router.get("/addition", middleware.isLoggedIn, function(req, res) {
	Score.find({game:"Hanson Addition Game"},{},{"sort":"score"}, function(err, allscores) {
		if(err)
			{
				console.log(err);
				res.redirect("back"); 
			}
		else
			{
				res.render("games/refactors/addition", {scores:allscores}); 
			}
	});
});

router.get("/subtraction", middleware.isLoggedIn, function(req, res) {
	Score.find({game:"Hanson Subtraction Game"},{},{"sort":"score"}, function(err, allscores) {
		if(err)
			{
				console.log(err);
				res.redirect("back"); 
			}
		else
			{
				res.render("games/refactors/subtraction", {scores:allscores}); 
			}
	});
});

router.get("/submit", function(req, res) {
	console.log("this is the post show route");  //later, show form that will have post route, and then in score.ejs(or something similar, allow user to submit score, passing in unique id to make url unique. later make sure it is authenticated, and signed in)
	
	res.render("games/submit"); //only works when logged in currently 
	
}); 

router.post("/submit", function(req, res) {

	let newScore = new Score({
		score:req.body.score,
		author:{
			id: req.user._id,
			username:req.user.username
		},
		game:req.body.game
	});
	
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
}); 

router.post("/problems", function(req, res) {
	let problemList = []; 
	for(let i = 0; i < req.body.numberOfProblems; i++)
		{
			problemList.push(req.body.problem[i]); 
		}
	//problemList = req.body.problemList;
	console.log(problemList); 
	res.render("partials/problemlist", {problemList:problemList}); 
}); 

module.exports = router; 