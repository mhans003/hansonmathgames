let express = require("express"),
	app = express(),
	bodyParser = require("body-parser"),
	mongoose = require("mongoose"),
	passport = require("passport"),
	flash = require("connect-flash"),
	LocalStrategy = require("passport-local"),
	PORT = process.env.PORT || 3000;

require('dotenv').config();

//require models
let User = require("./models/user"); 
let Score = require("./models/score"); 

//require seeds.js and seedDB function 
let seedDB = require("./seeds");

//require routes
let indexRoutes = require("./routes/index"); 
let gameRoutes = require("./routes/games"); 

//resolve depreication warnings and configure mongoose
mongoose.set("useUnifiedTopology", true); 
mongoose.set('useFindAndModify', false);
mongoose.Promise = global.Promise;

//connect to database
mongoose.connect(process.env.DATABASEURL, {
	useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
}).then(() => {
	//console.log("Databse Connected: " + process.env.DATABASEURL);
	console.log("database connected"); 
}).catch(err => {
	console.log("Database connection error: " + err.message); 
}); 

//seedDB(); //seed the database

//include flash
app.use(flash());

//passport configuration
app.use(require("express-session")({
	secret: "Tricky is the best",
	resave: false,
	saveUninitialized: false
}));
app.use(passport.initialize()); 
app.use(passport.session()); 

passport.use(new LocalStrategy(User.authenticate())); 
passport.serializeUser(User.serializeUser()); 
passport.deserializeUser(User.deserializeUser()); 

//set view engine
app.set("view engine", "ejs"); 

//include body parser
app.use(bodyParser.urlencoded({extended: true})); //must use in order to parse request body (req.body) properties

app.use(express.static(__dirname + "/public")); //determine need

//middleware to be called on every route - provide currentUser data and flash messages 
app.use(function(req, res, next) {
	res.locals.currentUser = req.user; 
	res.locals.error = req.flash("error");  
	res.locals.success = req.flash("success"); 
	next(); 
});
	
//include routes 
//app.use(express.static(__dirname + "/public")); 
app.use(indexRoutes);
app.use("/games", gameRoutes);  

app.listen(PORT, function() {
	console.log("hansonmathgames running"); 
}); 