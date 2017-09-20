const express = require('express')
const auth = require('./auth')
module.exports = function (server) {
    /*
    * Rotas protegidas por Token JWT
    */
    const protectedApi = express.Router()
    server.use('/api', protectedApi)
    protectedApi.use(auth)
    protectedApi.get('/', (req, res) => {
        res.json({ working: true })
    })

    /*
    * Rotas abertas
    */
    const AuthService = require('../api/user/AuthService')
    const openApi = express.Router()
    server.use('/oapi', openApi)
    openApi.post('/login', AuthService.login)
    openApi.post('/signup', AuthService.signup)
    openApi.post('/validateToken', AuthService.validateToken)
}