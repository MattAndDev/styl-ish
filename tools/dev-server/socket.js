/**
* @module dev-server/socket
*/

// core
const { parse } = require('url')
// libs
const WebSocket = require('ws')
// utils
const getRoute = require('./utils/get-route')
// config
const config = require('./config')

/**
*  socker server for dev server
*  attaches to main server port and maps socket routes agains config.socketRoutes
*
*  @func socket
*/

const socket = async (server) => {
  const ws = new WebSocket.Server({ server })
  ws.on('connection', async (socket, req) => {
    let path = parse(req.url, true).pathname
    let query = parse(req.url, true).query
    let { route, params } = getRoute(config.socketRoutes, path)
    if (route) {
      route(req, socket, { params, query })
      return false
    }
  })
  return ws
}

module.exports = socket
