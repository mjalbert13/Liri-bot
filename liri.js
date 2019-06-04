//Setting up environment
require("dotenv").config();
var fs = require("fs");
var keys = require("./keys");
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);
var axios = require("axios");
var inquirer = require("inquirer");

//Variables
var doInput = process.argv[2];
var whatInput= process.argv[3];

//Functions
//Spotify api function
var spotifyThat = function(song){
    
    if(song === undefined){
        song = "hey-i-dont-know"
    }
    spotify.search({
        type:'track',
        query: song
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
        var title = songInfo.name;
        var listen = songInfo.external_urls.spotify
        console.log("\n=========="+"\nTitle: "+title+"\nArtist(s): "+band+"\nAlbum: "+album+"\nListen here: "+listen+"\n==========");
    }
    )
}
    
//OMDB api function
var getMovie = function(movie){

    var queryUrl = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy";
    if(movie === undefined){
        movie="dodgeball"
    }
    axios.get(queryUrl).then(function(response){
        //console.log(response);
        var title = response.data.Title;
        var year = response.data.Year;
        var imdb = response.data.imdbRating;
        var rotten = response.data.imdbVotes;
        var language = response.data.Language
        var rated = response.data.Rated;
        var plot = response.data.Plot;
        var actors = response.data.Actors;
        console.log("\n=========="+"\nTitle: "+title+"\nYear: "+year+"\nIMDB rating: "+ imdb+"\nRotten Tamatoes: "+rotten+"\nLanguage: "+language+"\nRated: "+rated+"\nActors"+actors+"\nPlot: "+plot+"\n==========");
    })
}

//Bands in town api function
var concertThis = function(artist){
    if(artist===undefined){
        artist= "blink-182"
    }
  
    var bandURL ="https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";

    axios.get(bandURL).then(function(event){
        
        var concerts = event.data;
        //console.log(concerts);
        for(var i = 0; i < 10; i++){
            var venues = concerts[i].venue.name;
            var location = concerts[i].venue.city;
            var date = concerts[i].datetime;
            var lineUp = concerts[i].lineup;
            console.log("\n=========="+"\nVenue: "+venues+"\nCity: "+location+"\nDate: "+date+"\nLineup: "+lineUp+"\n==========");
        }
    })
}

//do-what-it-says function that reads the txt file and runs corisponding function
var doSomething = function(){
    fs.readFile("random.txt", "utf8",function(data){
        var text = data.split(",");
        spotifyThat(text[1])
    })
}

//Checks if any arguments are passed and then runs corisponding functions
console.log(doInput, whatInput);
if(doInput === "spotify-this"){
    spotifyThat(whatInput);

}else if(doInput === "movie-this"){
    getMovie(whatInput);

}else if(doInput ==="concert-this"){
    concertThis(whatInput);

}else if(doInput === "do-what-it-says"){
    doSomething(whatInput);

}else{
    doInput =undefined;
}

//If no argument is passed or is not a valid key word app will use inquirer 
if(doInput === undefined){
    console.log("Sorry I didn't catch that.")

    inquirer.prompt([
        {
            name: "something",
            type:"list",
            choices:["Spotify-this","Concert-this","Movie-this","Do-what-it-says"],
            message:"What do you want to do?"
            
        },
        {
            name:"what",
            type: "input",
            message: "What should I look up?"
        }

    ]).then(function(answer){
        var choice = answer.something;
        var search = answer.what;
        //console.log(search)
        if(choice ==="Movie-this"){
            getMovie(search);
        }
        if(choice ==="Spotify-this" ){
            spotifyThat(search);
        }
        if(choice === "Concert-this"){
            concertThis(search);
        }
        if(choice==="Do-what-it-says"){
            doSomething(search);
        }
    })
}