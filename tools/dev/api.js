/**
* @module dev-server/api
*
* dev server api (route handler)
*
*/
const fs = require('fs')
const path = require('path')
const url = require('url')

const resolver = require('./utils/resolver')
const renderer = require('./utils/renderer')
const mimeMap = require('./utils/mime-map')

/**
*  @func api
*/

const api = async (req, res) => {
  let relativePath = (req.url.indexOf('?' > -1)) ? req.url.split('?')[0] : req.url
  let file = await resolver(relativePath)
  if (!fs.existsSync(file)) {
    res.status = 404
    return false
  }
  let data = await renderer(file, true, url.parse(req.url, true).query.theme)
  res.setHeader('Content-type', mimeMap[path.extname(file)] || 'text/plain')
  res.status = 200
  res.end(data)
}

module.exports = api
