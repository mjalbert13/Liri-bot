//setting up environment
require("dotenv").config();
var fs = require("fs");
var keys = require("./keys");
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);
var axios = require("axios");
var inquirer = require("inquirer");

//variables
var doInput = process.argv[2];
var whatInput =process.argv[3];

//API urls
var queryUrl = "http://www.omdbapi.com/?t=" + whatInput + "&y=&plot=short&apikey=trilogy";
var bandURL ="https://rest.bandsintown.com/artists/" + whatInput+ "/events?app_id=codingbootcamp"

//Functions
//Spotify api function
var spotifyThat = function(whatInput){
    spotify.search({
        type:'track',
        query: whatInput
    },
    function(error, data){
        if(error){
            console.log(error);
            return;
        }
        var songInfo = data.tracks.items[0];
        //console.log(songInfo);
        var band = songInfo.album.artists[0].name;
        var album = songInfo.album.name;
        console.log("=========="+"Artist(s): "+band+"\nAlbum: "+album+"\n==========");
    }
    )
}
    
//OMDB api function
var getMovie = function(){
    axios.get(queryUrl).then(function(response){
        var title = response.data.Title;
        var year = response.data.Year;
        var rated = response.data.Rated;
        var plot = response.data.Plot;
        console.log("=========="+"\nTitle: "+title+"\nYear: "+year+"\nRated: "+rated+"\nPlot: "+plot+"\n==========");
    })
}

//Bands in town api function
var concertThis = function(){
    axios.get(bandURL).then(function(event){
        var concerts = event.data;
        //console.log(concerts);
        for(var i = 0; i < 10; i++){
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