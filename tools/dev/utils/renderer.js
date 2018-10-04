require('@babel/register')({
  presets: ['@babel/preset-react'],
  plugins: ['@babel/plugin-proposal-object-rest-spread']
})
const sass = require('node-sass')
const path = require('path')
const fs = require('fs')
const ReactDOMServer = require('react-dom/server')
const React = require('React')

const Vue = require('vue')
const VueRenderer = require('vue-server-renderer').createRenderer()

const renderer = async (file, inject) => {
  const engine = path.basename(file).split('.')[1]
  let rendered = null
  switch (engine) {
    case 'react': {
      let component = require(file)
      let componentElem = React.createElement(component)
      delete require.cache[require.resolve(file)]
      rendered = ReactDOMServer.renderToString(componentElem)
      let styles = sass.renderSync({ file: path.resolve(`./themes/default/components/${path.basename(file).split('.')[0]}.sass`) })
      rendered = `${rendered} <style> ${styles.css}</style>`
      if (inject) {
        let template = fs.readFileSync(path.resolve('./.tools/dev/layout.html')).toString()
        rendered = template.replace('{{yield}}', rendered)
      }
      break
    }
    case 'vue': {
      let component = require(file)
      let componentElem = new Vue(component)
      delete require.cache[require.resolve(file)]
      rendered = await VueRenderer.renderToString(componentElem)
      let styles = sass.renderSync({ file: path.resolve(`./themes/default/components/${path.basename(file).split('.')[0]}.sass`) })
      rendered = `${rendered} <style> ${styles.css}</style>`
      if (inject) {
        let template = fs.readFileSync(path.resolve('./.tools/dev/layout.html')).toString()
        rendered = template.replace('{{yield}}', rendered)
      }
      break
    }
    default:
      rendered = await fs.readFileSync(file)
  }
  return rendered
}

module.exports = renderer
