/**
*  @module dev-server/utils/get-route
*
*  express like route resolver
*  matches routes array against path
*  resolves routes path chunks marked with /: as parameters
*  returns the matching route function (if any) and the resolved params (if any)
*
*  @param {object} routes - an object with routes as keys
*  @param {string} path - the path to be matched against the routes
*
*  @returns {mixed} false if no match, object if match found {route, params}
*
*  @func getRoute
*/

const getRoute = (routes, path) => {
  // route routeping via config.routepings
  for (var route in routes) {
    // split at first occurence of /: and get [0] or self
    let staticRoute = (route.split('/:')[0]) ? route.split('/:')[0] : route
    // split at first occurence of /: and get [1] or self
    let routeArgs = (route.split(/\/:(.*)/)[1]) ? route.split(/\/:(.*)/)[1] : null
    // if matching routeping
    if (path.match(staticRoute)) {
      // convert route args (/:arg) to object if any
      let params = false
      if (routeArgs) {
        params = {}
        let rest = path.replace(staticRoute, '').split('/')
        rest.shift()
        routeArgs.split('/:').forEach((arg, i) => (params[arg] = rest[i]))
      }
      // call routeping function
      return { route: routes[route], params }
    }
  }
  // no matches
  return false
}

module.exports = getRoute
