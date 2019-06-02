require("dotenv").config();

var keys = require("./keys");

var spotify = new Spotify(keys.spotify);

var inquirer = require("inquirer");

inquirer.prompt([
    {
        name: "name",
        message:"whats your name?"
    }
]).then(function(answer){
    console.log(answer.name);
})