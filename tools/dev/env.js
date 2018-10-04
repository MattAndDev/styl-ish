const { resolve } = require('path')

module.exports = {
  port: 2000,
  socketPort: 2001,
  staticDir: resolve('./src'),
  themesDir: resolve('./themes'),
  componentsDir: resolve('components/')
}
