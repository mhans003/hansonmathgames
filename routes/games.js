var express = require("express"); 
var router = express.Router(); 

//index
router.get("/", function(req, res) {
	res.render("games/index"); 
});

//games
router.get("/multiplication", function(req, res) {
	res.render("games/multiplication");  
}); 

router.get("/division", function(req, res) {
	res.render("games/division");  
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

module.exports = router; 