'use strict'

require ('./auth')()

module.exports = {
    session : require('./session'),
    router : require('./routes')()
}