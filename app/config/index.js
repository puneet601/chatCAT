'use strict'

if(process.env.NODE_ENV==="production"){
    module.exports = {
        host : process.env.host || "",
        dbURI : process.env.dbURI || "",
        sessionSecret: process.env.sessionSecret || "",
        fb:{
            "clientID":process.env.FB_clientID | "",
            "clientSecret":process.env.FB_clientSecret | "",
            "callbackURL":process.env.host+"/auth/facebook/callback" || "",
            "profileFields":["id","displayName","photos"]
           },
        twitter:{
            "consumerKey":process.env.TWITTER_clientID,
            "consumerSecret":process.env.TWITTER_clientSecret,
            "callbackURL":process.env.host+"/auth/twitter/callback",
            "profileFields":["id","displayName","photos"]
           }
    }

}else{
    module.exports = require('./development.json')
}