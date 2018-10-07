/**
*  @module dev-server
*
*  configure routing and resolvers for dev server
*
*  @func config
*/

// core
const { resolve, join } = require('path')

module.exports = {
  port: 2000, // dev server port
  // route mappings, use as express
  // ...args === (req, res, {params, query})
  routes: {
    '/react/:folder/:name': (...args) => require('./routes/component.react')(...args),
    '/vue/:folder/:name': (...args) => require('./routes/component.vue')(...args)
  },
  // route mappings for socket
  // ...args === (req, socket, {params, query})
  socketRoutes: {
    '/component/:render/:folder/:name': (...args) => require('./socket-routes/watch.component')(...args),
    '/theme/:theme': (...args) => require('./socket-routes/watch.theme')(...args)
  },
  // fallback static directories
  static: [
    resolve('dist/'),
    resolve('tools/dev-server/client')
  ],
  fileResolvers: {
    vue: (filename) => join(resolve('assets/react/components'), `${filename}.jsx`),
    react: (filename) => join(resolve('assets/html/components'), filename, 'component.ejs')
  },
  layout: resolve('scripts/dev-server/layout.ejs'), // layout for components view (ejs)
  // mime mapping for static files
  mimeMap: {
    '.ico': 'image/x-icon',
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.json': 'application/json',
    '.css': 'text/css',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.woff': 'application/font-woff',
    '.woff2': 'application/font-woff2',
    '.svg': 'image/svg+xml'
  }
}
