# Liri-bot
Node js app that lets users search for songs, movies and concert info using the command line.

## Installation
- Clone to Download
```bash
git clone https://github.com/mjalbert13/Liri-bot.git
```
- npm install

## Usage
This app has four basic commands:
    Spotify-this  -  uses node spotify api to get information based on the song the user inputs 
    Concert-this  -  uses bands in town api to get concert information such as dates and venues 
    Movie-this    -  uses OMDB api to get movie information
    Do-what-it-says  - Reads a text file with a command inside and then runs that command
    
To run this app you can pass arguments in the command line or if no arguments are given inquirer will run.
When passing arguments dashes (-) must replace spaces for the app to recognize a space. You will be able 
to use spaces when inputting whaen inquirer runs.

   Passing arguments example: $ node liri.js spotify-this brother-in-the-night
  
   No arguments example: $ node liri.js 
                          what do you want to do?(use arrow keys)
                          >Spotify-this
                          Concert-this
                          Movie-this
                          Do-what-it-says
                         what should i look up? (input) 
                         
  ## Technologies Used:
  - Node
  - JavaScript
  - Spotify API
  - OMDB API
  - Bands in town API
    
    
