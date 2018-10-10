/**
*  @module dev-server/routes/component.ejs
*
*  route /component/:render/:name
*  resolves component file based on config.fileResolvers
*  renders file content with react renderToString
*  if query.layout returns the rendered component in the base layout file
*
*  @param {object} req - http server request object
*  @param {object} res - http server response object
*  @param {object} {params, query } - rooute parameters and query
*
*  @returns {boolean} true after sending response
*
*  @func componentReact
*/

// babel register to support react features in node
require('@babel/register')({
  presets: ['@babel/preset-env', '@babel/preset-react'],
  plugins: ['@babel/plugin-proposal-object-rest-spread']
})

const { existsSync, readFileSync } = require('fs')
const { join, resolve, basename } = require('path')

const sass = require('node-sass')
const ReactDOMServer = require('react-dom/server')
const React = require('React')

const componentReact = async (req, res, { params, query }) => {
  if (!params.name || !params.folder) {
    res.status = 400
    res.setHeader('Content-type', 'text/plain')
    res.end('/:name of component is required.')
    return true
  }

  let file = join(resolve('./components'), params.folder, `${params.name}/${params.name}.react.js`)
  if (!await existsSync(file)) {
    res.status = 404
    res.setHeader('Content-type', 'text/plain')
    res.end(`Component ${params.name} not found.`)
    return true
  }

  const component = require(file).default
  const componentElem = React.createElement(component)
  delete require.cache[require.resolve(file)]
  let rendered = ReactDOMServer.renderToString(componentElem)
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

module.exports = componentReact
