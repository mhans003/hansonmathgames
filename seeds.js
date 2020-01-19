var mongoose = require("mongoose"); 

var User = require("./models/user"); 


var starterUsers = [
    {
        username: "mhans003", 
        password: "test",
		isAdmin: true,
		firstName: "Michael",
		lastName: "Hanson",
		email: "test@email.com"
    },
    {
        username: "michaeledward", 
        password: "tester",
		isAdmin: true,
		firstName: "Michael",
		lastName: "Hanson",
		email: "tester@email.com"
    }
]; 

//older/longer syntax
/*
function seedDB() {
	Sign.deleteMany({}, function(err) {	//delete all signs in database 
		if(err)
			{
				console.log(err); //output delete error 
			}
		else
			{
				console.log("removed signs"); 
				starterSigns.forEach(function(seed) {	//for every one of the starter data 
					Sign.create(seed, function(err, sign) {	//create a new sign with that starter data 
						if(err) 
							{
								console.log(err); //output error for creating sign 
							}
						else
							{
								console.log("created sign"); 
								//create comment
								Comment.create(	//create a new comment for that sign 
									{
										text: "Great drink",
										author: "Bob"
									}, function(err, comment) {
										if(err) 
											{
												console.log(err); //output error for creating comment 
											}
										else
											{
												sign.comments.push(comment); //add the new comment to the current sign 
												sign.save(); 	//save the current sign 
												console.log("created new comment"); 
											}
								}); 
							}
					}); 
				});
			}
	}); 
}
*/

//newer/shorter syntax 
async function seedDB() {
	await User.deleteMany({}); 
	
	for(const starterUser of starterUsers) 
		{
			let user = await User.create(starterUser);
			user.save(); 
		}
		
}
 


module.exports = seedDB;