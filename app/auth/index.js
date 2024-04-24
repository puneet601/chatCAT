'use strict'
const passport = require('passport')
const config = require('../config')
const h =require('../helpers')
const FacebookStrategy = require('passport-facebook').Strategy
const TwitterStrategy = require('passport-twitter').Strategy
module.exports = () =>{

    passport.serializeUser((user,done)=>{
        done(null,user.id)
    })

    passport.deserializeUser((id,done)=>{
        //find by id
        h.findById(id).then(user => done(null,user)).catch(error => console.log('error deserialising the user'))
    })

    let authProcessor = (accesstoken,refreshToken,profile,done)=>{
        // find user in local db via profile.id
        h.findOne(profile.id).then(result =>{
            if(result){
                done(null,result)
            }else{
                h.createNewUser(profile).then(newUser => done(null,newUser)).catch(error => console.log(error))
            }
        })
        // if user found return user data using the done()
        // if user is not found, create one in local db and return
        
    }
    passport.use(new FacebookStrategy(config.fb,authProcessor))
    passport.use(new TwitterStrategy(config.twitter,authProcessor))
}