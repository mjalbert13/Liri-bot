//setting up environment
require("dotenv").config();

var keys = require("./keys");
var Spotify = require("spotify-web-api-js");
var spotify = new Spotify(keys.spotify);

var inquirer = require("inquirer");

//variables
var doInput;
var whatInput;
var song;
//functions
var spotifyThat = function(song){
    if(whatInput=== undefined){
        whatInput = "Hey I don't know";
    }
    spotify.search(
        {
            type:"track",
            query: song
        },
        function(err, data){
            if(err){
                console.log("Error: "+err);
                return;
            }
            var info = data.tracks.items;
            for(var i =0; i < info.length; i++){
                console.log(i);
            }
        }
    )
}

inquirer.prompt([
    {
        name: "what",
        type:"input",
        message:"what do you want to do?",
        
    },
    {
        name:"song-movie",
        type: "input",
        message: "What should I look up?"
    }

]).then(function(answer){
    var doInput = answer.name;
    if(doInput ==="spotify"){
        spotifyThat();

    }
})