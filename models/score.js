var mongoose = require("mongoose"); 
var passportLocalMongoose = require("passport-local-mongoose"); 

var ScoreSchema = new mongoose.Schema({
	value: Number,
	createdAt: {type: Date, default: Date.now},
	player: {
		id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User"
		},
		username: String
	},
	game: String
});

UserSchema.plugin(passportLocalMongoose); //adds methods into score 

module.exports = mongoose.model("Score", ScoreSchema); 