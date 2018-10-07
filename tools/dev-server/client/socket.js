/* globals WebSocket, XMLHttpRequest */

/**
*  @module dev-server/client/socket
*
*  Socket client to be attached to layout for component HMR
*  Attaches watcher sockets for components and css
*/
let theme = (new URL(document.location)).searchParams.get('theme')
const updater = () => {
  var req = new XMLHttpRequest()
  req.open('GET', `${window.location.pathname}?theme=${theme}`, true)
  req.send(null)
  req.onload = function () {
    document.querySelector('.component').innerHTML = req.response
  }
  return false
}
// Add component watcher socket
const componentWatcher = new WebSocket(`ws://127.0.0.1:2000/component${window.location.pathname}`)
componentWatcher.onmessage = function (message) {
  if (message.data === 'update') updater()
}
if (theme) {
  // Add component watcher socket
  const themeWatcher = new WebSocket(`ws://127.0.0.1:2000/theme/${theme}`)
  themeWatcher.onmessage = function (message) {
    if (message.data === 'update') updater()
  }
}
