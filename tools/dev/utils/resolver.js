const path = require('path')
const url = require('url')
const env = require('../env')

/**
*  Custom resolver to map against any folder structure
*
*  @func resolver
*/
const resolver = async (reqUrl) => {
  let pathChucks = reqUrl.split('/')
  let componentName = pathChucks[pathChucks.length - 1]
  if (pathChucks[1] === 'vue' || pathChucks[1] === 'react') {
    return path.join(env.componentsDir, pathChucks[2], componentName, `${componentName}.${pathChucks[1]}.js`)
  }
  return path.join(env.staticDir, url.parse(reqUrl).pathname)
}

module.exports = resolver
