let mongoose = require("mongoose"); 
let passportLocalMongoose = require("passport-local-mongoose"); 

let UserSchema = new mongoose.Schema({
	username: {
		type: String,
		unique: true,
		required: true,
		sparse: true
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