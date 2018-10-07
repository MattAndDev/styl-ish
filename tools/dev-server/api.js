/**
* @module dev-server/api
*/

// core
const { existsSync, readFileSync, lstatSync } = require('fs');
const { extname, join } = require('path');
const { parse } = require('url');

// utilities
const getRoute = require('./utils/get-route');
// config
const config = require('./config');

/**
*  api logic for dev server
*  matches request url with config.routes
*  if no route are matched falls back to config.static
*  if no file can be resolved returns 404
*
*  @param {object} req - http server request object
*  @param {object} res - http server response object
*
*  @returns {boolean} false if response was not sent directly, true otherwise
*
*  @func api
*/

const api = async (req, res) => {

  // cleanup request
  let path = parse(req.url, true).pathname;
  let query = parse(req.url, true).query;

  // if route in config routes match
  let {route, params} = getRoute(config.routes, path);
  if (route) {
    // pass on request, responese and clean reques
    route(req, res, { params, query});
    return false;
  }

  // static mapping via config.static
  for (let i = 0; i < config.static.length; i++) {
    // if file exists serve as static based on config.mimeMap
     let filePath = join(config.static[i], `/${path}`);
     if (await existsSync(filePath) && await lstatSync(filePath).isFile()) {
       res.setHeader('Content-type', config.mimeMap[extname(filePath)] || 'text/plain');
       let data = await readFileSync(filePath);
       res.statusCode = 200;
       res.end(data);
       return true;
     }
  }

  // nothing to be found or resolved, bye
  res.statusCode = 404;
  res.setHeader('Content-type', 'text/html');
  res.end('404 // this ain\'t what you are looking for');
  return true;
};

module.exports = api;
