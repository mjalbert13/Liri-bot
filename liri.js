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
var bandURL ="https://rest.bandsintown.com/artists/" + whatInput+ "/events?app_id=codingbootcamp"
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
        var title = response.data.title;
        var year = response.data.Year;
        var rated = response.data.Rated;
        var plot = response.data.Plot;
        console.log("============"+"\nTitle: "+title+"\nYear: "+year+"\nRated: "+rated+"\nPlot: "+plot+"\n=========");
    })
}

var concertThis = function(){
    axios.get(bandURL).then(function(event){
        var concerts = event.data;
        //console.log(concerts);
        for(var i = 0; i < concerts.length; i++){
            var venues = concerts[i].venue.name;
            var location = concerts[i].venue.city;
            var date = concerts[i].datetime;
            var lineUp = concerts[i].lineup;
            console.log("=========="+"\nVenue: "+venues+"\nCity: "+location+"\nDate: "+date+"\nLineup: "+lineUp+"\n==========");
        }
        
    
    })
}
console.log(doInput, whatInput);
if(doInput === "spotify"){
    
    spotifyThat(whatInput);
}
if(doInput === "omdb"){
    getMovie(whatInput);
}

if(doInput ==="concert"){
    concertThis(whatInput);
}

if(doInput === ""){
    console.log("Look what I can do....!")
}
// inquirer.prompt([
//     {
//         name: "something",
//         type:"input",
//         message:"what do you want to do?",
        
//     },
//     {
//         name:"what",
//         type: "input",
//         message: "What should I look up?"
//     }

// ]).then(function(answer){
//     var doInput = answer.name;
//     if(doInput ==="omdb"){
//         getMovie(answer.something);
//     }
// })