/**
* @module dev
*
*/

const http = require('http')
const api = require('./api')

const socket = require('./socket')
const env = require('./env')

/**
*
*  @func start
*  @returns {Object} the server instance
*/
const start = async () => {
  const server = http.createServer(api)
  server.listen(env.port)
  server.socket = socket(server)
  return server
}

module.exports = start()
