const fs = require('fs')
const WebSocket = require('ws')
const resolver = require('./utils/resolver')
const renderer = require('./utils/renderer')

const socket = async (server) => {
  const ws = new WebSocket.Server({ server })
  ws.on('connection', async (socket, req) => {
    let file = await resolver(req.url)
    fs.watch(file, async () => {
      console.log('update')
      let data = await renderer(file, false)
      socket.send(data)
    })
  })
  return ws
}

module.exports = socket
