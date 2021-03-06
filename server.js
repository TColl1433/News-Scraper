const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const PORT = 5000;
const routes = require('./routes/routes');
const MongoClient = require('mongodb').MongoClient;
const db_url = 'mongodb://localhost:27017';

const app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

// setup Express to handle form data and attach it to the req.body
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

MongoClient.connect(db_url,
    { useNewUrlParser: true },
    function (err, client) {
        if (err) throw err;

        console.log("Connected successfully to server");

        const db = client.db('scrapeApp');
        const collection = db.collection('favorites');

        routes(app, collection);

        app.listen(PORT, () => console.log('Listening on port %s', PORT));
    });

// const mongoose = require("mongoose");



//step 2 - calling function and passing in argument















//https://www.npr.org/sections/news/


//------------------------------------------------------------------------first attempt------------------
// var express = require("express");
// var exphbs = require("express-handlebars");
// var logger = require("morgan");
// var mongoose = require("mongoose");
// var bodyParser = require("body-parser");



// // Our scraping tools
// // Axios is a promised-based http library, similar to jQuery's Ajax method
// // It works on the client and on the server
// var axios = require("axios");
// var cheerio = require("cheerio");

// // Require all models
// var db = require("./models");

// var PORT = 3000;

// // Initialize Express
// var app = express();


// // Configure middleware

// // Use morgan logger for logging requests
// app.use(logger("dev"));
// // Parse request body as JSON
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());
// // Make public a static folder
// app.use(express.static("public"));

// // Connect to the Mongo DB
// // mongoose.connect("mongodb://localhost/unit18Populater", { useNewUrlParser: true });

// // Routes

// // A GET route for scraping the echoJS website
// app.get("/scrape", function (req, res) {
//     // First, we grab the body of the html with axios
//     axios.get("http://www.echojs.com/").then(function (response) {
//         // Then, we load that into cheerio and save it to $ for a shorthand selector
//         var $ = cheerio.load(response.data);

//         // Now, we grab every h2 within an article tag, and do the following:
//         $("article h2").each(function (i, element) {
//             // Save an empty result object
//             var result = {};

//             // Add the text and href of every link, and save them as properties of the result object
//             result.title = $(this)
//                 .children("a")
//                 .text();
//             result.link = $(this)
//                 .children("a")
//                 .attr("href");

//             // Create a new Article using the `result` object built from scraping
//             db.Article.create(result)
//                 .then(function (dbArticle) {
//                     // View the added result in the console
//                     console.log(dbArticle);
//                 })
//                 .catch(function (err) {
//                     // If an error occurred, log it
//                     console.log(err);
//                 });
//         });

//         // Send a message to the client
//         res.send("Scrape Complete");
//     });
// });

// // Route for getting all Articles from the db
// app.get("/articles", function (req, res) {
//     // Grab every document in the Articles collection
//     db.Article.find({})
//         .then(function (dbArticle) {
//             // If we were able to successfully find Articles, send them back to the client
//             res.json(dbArticle);
//         })
//         .catch(function (err) {
//             // If an error occurred, send it to the client
//             res.json(err);
//         });
// });

// // Route for grabbing a specific Article by id, populate it with it's note
// app.get("/articles/:id", function (req, res) {
//     // Using the id passed in the id parameter, prepare a query that finds the matching one in our db...
//     db.Article.findOne({ _id: req.params.id })
//         // ..and populate all of the notes associated with it
//         .populate("note")
//         .then(function (dbArticle) {
//             // If we were able to successfully find an Article with the given id, send it back to the client
//             res.json(dbArticle);
//         })
//         .catch(function (err) {
//             // If an error occurred, send it to the client
//             res.json(err);
//         });
// });

// // Route for saving/updating an Article's associated Note
// app.post("/articles/:id", function (req, res) {
//     // Create a new note and pass the req.body to the entry
//     db.Note.create(req.body)
//         .then(function (dbNote) {
//             // If a Note was created successfully, find one Article with an `_id` equal to `req.params.id`. Update the Article to be associated with the new Note
//             // { new: true } tells the query that we want it to return the updated User -- it returns the original by default
//             // Since our mongoose query returns a promise, we can chain another `.then` which receives the result of the query
//             return db.Article.findOneAndUpdate({ _id: req.params.id }, { note: dbNote._id }, { new: true });
//         })
//         .then(function (dbArticle) {
//             // If we were able to successfully update an Article, send it back to the client
//             res.json(dbArticle);
//         })
//         .catch(function (err) {
//             // If an error occurred, send it to the client
//             res.json(err);
//         });
// });



// app.use(logger("dev"));
// app.use(
//     bodyParser.urlencoded({
//         extended: false
//     })
// );

// // Make public a static folder
// //DOUBLE CHECK THIS IS WORKING!!!
// // app.use(express.static(process.cwd() + "/public"));

// //require and set up handlebars


// //this is letting express know that I have a view engine.
// app.engine(
//     "handlebars",
//     exphbs({
//         defaultLayout: "main"
//     })
// );
// app.set('view engine', "handlebars");




// // Require all models
// // var db = require("models");

// //Connecting to Mongoose database this is from homework instructions
// const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/news_scraper";

// mongoose.connect(MONGODB_URI, { useNewUrlParser: true });


// //below checks to see if the connection ot mongose is working
// var db = mongoose.connection;
// db.on("error", console.error.bind(console, "connection error"));
// db.once("open", function () {
//     console.log("connected to Mongoose!");
// });


// // var routes = require("./controller/controller");
// // app.use("/", routes);


// // Start the server

