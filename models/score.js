var mongoose = require("mongoose"); 
//var passportLocalMongoose = require("passport-local-mongoose"); 

var ScoreSchema = new mongoose.Schema({
	score: {
		type: Number, 
		unique: false,
		sparse: true
	},
	author: {
		id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			sparse: true
		},
		username: {
			type: String,
			sparse: true 
		}
	},
	game: {
		type: String,
		unique: false,
		sparse: true
	}
});

//ScoreSchema.plugin(passportLocalMongoose); //adds methods into score 

module.exports = mongoose.model("Score", ScoreSchema); 

/*,
	createdAt: {type: Date, default: Date.now},
	player: {
		id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User"
		},
		username: String
	},
	game: String*/