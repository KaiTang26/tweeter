"use strict";

// Basic express setup:

const PORT          = 8080;
const express       = require("express");
const bodyParser    = require("body-parser");
const sassMiddleware = require('node-sass-middleware');
const app           = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.use(sassMiddleware({
  src: './server/stylesheets', // Location of SASS files
  dest: './public/styles',
  debug: true,                // Compiled CSS location
  prefix: '/styles'       // URL path to be intercepted by the middleware and
}));                     // compiled on the fly. When the browser tries to


app.use(express.static("./public"));



const loadDb = require('./lib/mongo-db.js');

const loadDbUse = require('./lib/mongo-db-users.js');

loadDb(function(db) {

  loadDbUse(function(userDb){

    const DataHelpers = require("./lib/data-helpers.js")(db);

    const tweetsRoutes = require("./routes/tweets")(DataHelpers);

    const usersRoutes = require("./routes/users")(userDb);

    app.use("/tweets", tweetsRoutes);

    app.use("/users", usersRoutes);

    app.listen(PORT, () => {
    console.log("Example app listening on port " + PORT);
    });

  })

});



























// function (db) {
//    const DataHelpers = require("./lib/data-helpers.js")(db);
//   const tweetsRoutes = require("./routes/tweets")(DataHelpers);

//   app.use("/tweets", tweetsRoutes);
// }

// MongoClient.connect(MONGODB_URI, (err, db) => {
//   if (err) {
//     console.error(`Failed to connect: ${MONGODB_URI}`);
//     throw err;
//   }

//   console.log(`Connected to mongodb: ${MONGODB_URI}`);

//   db.collection("tweets").find().toArray((err, resultArry)=>{

//     if (err) throw err;

//     const DataHelpers = require("./lib/data-helpers.js")(resultArry);

//     const tweetsRoutes = require("./routes/tweets")(DataHelpers);


// // important
//     console.log(resultArry);

//     db.close();
//   });

// });


// // The in-memory database of tweets. It's a basic object with an array in it.
// // const db = require("./lib/in-memory-db");

// // The `data-helpers` module provides an interface to the database of tweets.
// // This simple interface layer has a big benefit: we could switch out the
// // actual database it uses and see little to no changes elsewhere in the code
// // (hint hint).
// //
// // Because it exports a function that expects the `db` as a parameter, we can
// // require it and pass the `db` parameter immediately:

// // const DataHelpers = require("./lib/data-helpers.js")(db);

// // The `tweets-routes` module works similarly: we pass it the `DataHelpers` object
// // so it can define routes that use it to interact with the data layer.
// // const tweetsRoutes = require("./routes/tweets")(DataHelpers);

// // Mount the tweets routes at the "/tweets" path prefix:
// // app.use("/tweets", tweetsRoutes);

// app.listen(PORT, () => {
//   console.log("Example app listening on port " + PORT);
// });
