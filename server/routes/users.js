"use strict";

const userHelper    = require("../lib/util/user-helper")

const express       = require('express');
const usersRoutes  = express.Router();

module.exports = function(userDb) {

  usersRoutes.get("/", function(req, res) {

    userDb.collection("users").find().toArray((err, result)=>{

        if (err) throw err;

        res.json(result);
      });
  });

  usersRoutes.post("/", function(req, res) {

    const lastName =req.body.LastName;
    const firstName = req.body.firstName;
    const username = firstName + " " + lastName;
    let userID = generateUserID();
    const password = req.body.password;



    const user = {
      userId:userID,
      name: username,
      password: password
    };

    console.log(user);

    userDb.collection("users").insertOne(user);
    console.log(userDb);
    res.status(201).send();

  });

  return usersRoutes;

}

function generateUserID(){
  let result = '';
  let chars ="0123456789";
  for (var i = 3; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
  return result;
}
