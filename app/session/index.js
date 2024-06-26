'use strict'
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const config = require('../config')
const db = require('../db')

if(process.env.NODE_ENV === 'production'){
    // initialize session with prod env settings
    module.exports = session({
        secret : config.sessionSecret,
        resave:false,
        saveUninitialized:false,
        store: new MongoStore({
            mongooseConnection: db.Mongoose.connection
        })
    })

}else{
    // initialize session with dev env settings
    module.exports = session({
        secret : config.sessionSecret,
        resave: false,
        saveUninitialized: true
    })

}