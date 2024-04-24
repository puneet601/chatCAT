'use strict'

require ('./auth')()

let iosocket = (app) => {

}

module.exports = {
    session : require('./session'),
    router : require('./routes')()
}