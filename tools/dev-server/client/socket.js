/* globals WebSocket, XMLHttpRequest */

/**
*  @module dev-server/client/socket
*
*  Socket client to be attached to layout for component HMR
*  Attaches watcher sockets for components and css
*/

// Add component watcher socket
const componentWatcher = new WebSocket(`ws://127.0.0.1:2000/watch${window.location.pathname}`)
componentWatcher.onmessage = function (message) {
  if (message.data === 'update') {
    var req = new XMLHttpRequest()
    req.open('GET', window.location.pathname, true)
    req.send(null)
    req.onload = function () {
      document.querySelector('.component').innerHTML = req.response
    }
    return false
  }
}
