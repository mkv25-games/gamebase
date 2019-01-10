const express = require('express')
const cors = require('cors')
const path = require('path')

let server = express()
const port = 9500

server.use(cors())
server.use('/', express.static(path.join(__dirname, 'build')))
server.use('/js/phaser/', express.static(path.join(__dirname, 'node_modules/phaser/build')))
server.listen(port, function () {
  console.log(`Gamebase server listening on http://localhost:${port}/`)
})
