/**
* @module dev-server
*
* http server with custom route mapping "express style"
* bounds a dynamic as well as static node http server
* with socket support via ws
* setup is config first see './config.js'
*
*/

// core
const http = require('http')

// local packages
const api = require('./api')
const socket = require('./socket')

// config
const config = require('./config')

/**
*  starts the dev server, attaches socket
*
*  @func start
*  @returns {object} the server instance
*/

const start = async () => {
  const server = http.createServer(api)
  server.listen(config.port)
  server.socket = socket(server)
  // eslint-disable-next-line no-console
  console.log(`Started server at localhost: http://localhost:${config.port}`)
  // eslint-disable-next-line no-console
  console.log(`Access react component at /component/jsx/component-name`)
  // eslint-disable-next-line no-console
  console.log(`Access static component at /component/ejs/component-name`)
  return server
}

module.exports = start()
