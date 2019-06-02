//setting up environment
require("dotenv").config();
var fs = require("fs");
var keys = require("./keys");
var Spotify = require("spotify-web-api-js");
var spotify = new Spotify(keys.spotify);
var axios = require("axios");
var inquirer = require("inquirer");

//variables
var doInput = process.argv[2];
var whatInput =process.argv[3];

var queryUrl = "http://www.omdbapi.com/?t=" + whatInput + "&y=&plot=short&apikey=trilogy";
//functions
var spotifyThat = function(whatInput){
    if(whatInput=== undefined){
        whatInput = "Hey I don't know";
    }
    spotify.search(
        {
            type:"track",
            query: whatInput
        },
        function(err, data){
            if(err){
                console.log("Error: "+err);
                return;
            }
            var info = data.tracks.items;
            for(var i =0; i < info.length; i++){
                console.log(i);
                console.log("Song name: "+info[i].name);
            }
        }
    )
}
var getMovie = function(){
    axios.get(queryUrl).then(function(response){
        var year = response.data.Year;
        console.log(whatInput+" was released in "+year);
    })
}

console.log(doInput, whatInput);
if(doInput === "spotify"){
    
    spotifyThat(whatInput);
}

if(doInput === "omdb"){
    getMovie(whatInput);
}
// nquirer.prompt([
//     {
//         name: "what",
//         type:"input",
//         message:"what do you want to do?",
        
//     },
//     {
//         name:"song-movie",
//         type: "input",
//         message: "What should I look up?"
//     }

// ]).then(function(answer){
//     var doInput = answer.name;
//     if(doInput ==="spotify"){
//         spotifyThat();

//     }
// })