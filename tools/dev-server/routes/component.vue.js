/**
*  @module dev-server/routes/component.ejs
*
*  route /component/:render/:name
*  resolves component file based on config.fileResolvers
*  renders file content with ejs
*  if query.layout returns the rendered component in the base layout file
*
*  @param {object} req - http server request object
*  @param {object} res - http server response object
*  @param {object} {params, query } - rooute parameters and query
*
*  @returns {boolean} true after sending response
*
*  @func componentEjs
*/

const { existsSync, readFileSync } = require('fs')
const { join, resolve, basename } = require('path')

const Vue = require('vue')
const VueRenderer = require('vue-server-renderer').createRenderer()
const sass = require('node-sass')

const componentEjs = async (req, res, { params, query }) => {
  if (!params.name || !params.folder) {
    res.status = 400
    res.setHeader('Content-type', 'text/plain')
    res.end('/:name of component is required.')
    return true
  }
  let file = join(resolve('./components'), params.folder, `${params.name}/${params.name}.vue.js`)
  if (!await existsSync(file)) {
    res.status = 404
    res.setHeader('Content-type', 'text/plain')
    res.end(`Component ${params.name} not found.`)
    return true
  }
  let component = require(file)
  let componentElem = new Vue(component)
  delete require.cache[require.resolve(file)]
  let rendered = await VueRenderer.renderToString(componentElem)
  if (query.theme) {
    let styles = sass.renderSync({ file: resolve(`./themes/${query.theme}/components/${basename(file).split('.')[0]}.sass`) })
    rendered = `${rendered} <style> ${styles.css}</style>`
  }
  if (query && query.layout) {
    let template = readFileSync(join(__dirname, '../client/layout.html')).toString()
    rendered = template.replace('{{yield}}', rendered)
  }

  res.status = 200
  res.setHeader('Content-type', 'text/html')
  res.end(rendered)
  return true
}

module.exports = componentEjs
