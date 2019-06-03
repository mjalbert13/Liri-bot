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
var whatInput= process.argv[3];



//Functions
//Spotify api function
var spotifyThat = function(whatInput){
    if(whatInput === undefined){
        whatInput = "hey-i-dont-know"
    }
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
        var title = songInfo.name;
        var listen = songInfo.external_urls.spotify
        console.log("\n=========="+"\nTitle: "+title+"\nArtist(s): "+band+"\nAlbum: "+album+"\nListen here: "+listen+"\n==========");
    }
    )
}
    
//OMDB api function
var getMovie = function(movie){

    var queryUrl = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy";
    // if(whatInput === undefined){
    //     whatInput="mr-nobody"
    // }
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
var concertThis = function(show){
    if(whatInput===undefined){
        whatInput = "blink-182"
    }
    console.log(show)
    var bandURL ="https://rest.bandsintown.com/artists/" +show+ "/events?app_id=codingbootcamp"

    axios.get(bandURL).then(function(error,event){
        // if(error){
        //     console.log("Sorry could not find any concerts");
        //     return;
        // }
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
var doSomething = function(){
    fs.readFile("random.txt", "utf8",function(err,data){
        var text = data.split(",");
        spotifyThat(text[1])
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

if(doInput === undefined){
    console.log("Look what I can do....!")


inquirer.prompt([
    {
        name: "something",
        type:"list",
        choices:["Spotify-this","Concert-this","Movie-this","Do-what-it-says"],
        message:"what do you want to do?"
        
    },
    {
        name:"what",
        type: "input",
        message: "What should I look up?"
    }

]).then(function(answer){
    var doInput = answer.something;
    var search = answer.what;
    console.log(search)
    if(doInput ==="Movie-this"){
        getMovie(search);
    }
    if(doInput ==="Spotify-this" ){
        spotifyThat(search);
    }
    if(doInput === "Concert-this"){
        concertThis(search);
    }
    if(doInput==="Do-what-it-says"){
        doSomething(search);
    }
})
}