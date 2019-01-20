const express = require('express')
const cors = require('cors')
const path = require('path')

let server = express()
const httpPort = 9500
const httpsPort = 9543

server.use(cors())
server.use('/', express.static(path.join(__dirname, 'build')))
server.use('/js/phaser/', express.static(path.join(__dirname, 'node_modules/phaser/build')))

const fs = require('fs')
const http = require('http')
const https = require('https')
const options = {
  key: fs.readFileSync(path.join(__dirname, 'gamebase.dev.key')),
  cert: fs.readFileSync(path.join(__dirname, 'gamebase.dev.crt')),
}

http.createServer(server).listen(httpPort, () => {
    console.log(`Gamebase server listening on http://localhost:${httpPort}/`)
});
https.createServer(options, server).listen(httpsPort, () => {
    console.log(`Gamebase server listening on https://gamebase.dev:${httpsPort}/`)
});
