'use strict';
const config = require('../config');
const Mongoose = require('mongoose');
const dbURI = config.dbURI;

Mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true });

Mongoose.connection.on('connected', () => {
    console.log('Mongoose connected to ' + dbURI);
});

Mongoose.connection.on('error', (err) => {
    console.log('Mongoose connection error: ' + err);
});

Mongoose.connection.on('disconnected', () => {
    console.log('Mongoose disconnected');
});


const chatUser = new Mongoose.Schema({
    'profileId':String,
    'fullName':String,
    'profilePic':String
})

let userModel = Mongoose.model('chatUser',chatUser)

module.exports = {
    Mongoose,
    userModel
};
