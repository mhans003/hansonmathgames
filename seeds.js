let mongoose = require("mongoose"); 

let User = require("./models/user"); 
let Score = require("./models/score"); 


let starterUsers = [
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
    },
	{
        username: "test", 
        password: "test",
		isAdmin: true,
		firstName: "test",
		lastName: "test",
		email: "test@test.com"
    }
]; 

//newer/shorter syntax 
async function seedDB() {
	await User.deleteMany({});
	await Score.deleteMany({}); 
	
	for(const starterUser of starterUsers) 
		{
			let user = await User.create(starterUser);
			user.save(); 
		}
		
}
 


module.exports = seedDB;