const { response } = require("express");
// server.js
// This is where your node app starts

//load the 'express' module which makes writing webservers easy
const express = require("express");
const app = express();

//load lodash module 
const _ = require("lodash");

//load the quotes JSON
const quotes = require("./quotes.json");
const quotesWithId = require("./quotes-with-id.json")


// Now register handlers for some routes:
//   /                  - Return some helpful welcome info (text)
//   /quotes            - Should return all quotes (json)
//   /quotes/random     - Should return ONE quote (json)
app.get("/", function (request, response) {
  response.send("Neill's Quote Server!  Ask me for /quotes/random, or /quotes");
});

//START OF YOUR CODE...
//CALLBACKS//
/* function pickFromArray(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}; */

const getQuotes = (term, arr) => {
  return arr.filter(quoteObject => {
   return quoteObject.quote.toLowerCase().includes(` ${term} `.toLowerCase()); //should use regex
  })
}

app.get("/quotes", function (request, response) {
  response.send(quotes);
});

app.get("/quotes/random", function (req, res) {
  let random = _.sample(quotes);
  res.send(random);
});

app.get("/quotes/search", function (req, res) {
  const searchQuery = req.query.term
  res.send(getQuotes(searchQuery, quotes));
});

//...END OF YOUR CODE

//You can use this function to pick one element at random from a given array
//example: pickFromArray([1,2,3,4]), or
//example: pickFromArray(myContactsArray)
//

//Start our server so that it listens for HTTP requests!
let port = 5000;

app.listen( port, function () {
  console.log("Your app is listening on port " + port);
});
