var mongoose = require("mongoose"); 
var passportLocalMongoose = require("passport-local-mongoose"); 

var UserSchema = new mongoose.Schema({
	username: {
		type: String,
		unique: true,
		required: true
	},
	password: String,
	isAdmin: {
		type: Boolean,
		default: false
	},
	firstName: String,
	lastName: String,
	email: {
		type: String,
		unique: true,
		required: true
	},
	resetPasswordToken: String,
	resetPasswordExpires: Date
}); 

UserSchema.plugin(passportLocalMongoose); //adds methods into user 

module.exports = mongoose.model("User", UserSchema); 