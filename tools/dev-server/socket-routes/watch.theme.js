/**
*  @module dev-server/socket-routes
*
*  route for socket /watch/component/:render/:name
*  resolves component file based on config.fileResolvers
*  attaches fs.watch to it and sends update down the socket when file changes
*
*  @param {object} req - http server request object
*  @param {object} socket - ws socket instance
*
*  @returns {boolean} true if watcher attached, false if not
*
*  @func watchComponent
*/

const { existsSync, watch } = require('fs')
const { join, resolve } = require('path')

const watchTheme = async (req, socket, { params }) => {
  if (params.theme) {
    let folder = join(resolve('./themes'), params.theme)
    if (existsSync(folder)) {
      let debounce = false
      // NOTE: recursive true won't work in linux
      watch(folder, { recursive: true }, async (event, filename) => {
        if (debounce) return
        if (filename && event === 'change' && socket.readyState === 1) {
          socket.send('update')
        }
        debounce = setTimeout(() => (debounce = false), 1500)
      })
    }
  }
  return false
}

module.exports = watchTheme
