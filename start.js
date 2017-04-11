const express = require('express')
const path = require('path')

let server = express()
const port = 9500

server.use('/', express.static(path.join(__dirname, 'build')))
server.listen(port, function () {
  console.log(`Gamebase server listening on http://localhost:${port}/`)
})
