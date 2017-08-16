var path = require('path')
var metadata = require('read-metadata')
var exists = require('fs').existsSync
var getGitUser = require('./git-user')

/**
 * Read prompts metadata.
 *
 * @param {String} dir
 * @return {Object}
 */

module.exports = function options (name, dir, branch) {
  var opts = {};
  opts = getMetadata(dir, branch) 
  if (branch === 'template') {
    setDefault(opts, 'name', name)
  }
  // var author = getGitUser()
  // if (author) {
  //   setDefault(opts, 'author', author)
  // }

  return opts
}

/**
 * Gets the metadata from either a meta.json or meta.js file.
 *
 * @param  {String} dir
 * @return {Object}
 */

function getMetadata (dir, branch) {
  var json = path.join(dir, 'meta.json')
  var js = path.join(dir, 'meta.js')
  var opts = {}

  if (exists(json)) {
    opts = metadata.sync(json)[branch]
  } else if (exists(js)) {
    var req = require(path.resolve(js))
    if (req !== Object(req)) {
      throw new Error('meta.js needs to expose an object')
    }
    opts = req[branch]
  }

  return opts
}


/**
 * Set the default value for a prompt question
 *
 * @param {Object} opts
 * @param {String} key
 * @param {String} val
 */

function setDefault (opts, key, val) {
  if (opts.schema) {
    opts.prompts = opts.schema
    delete opts.schema
  }
  var prompts = opts.prompts || (opts.prompts = {})
  if (!prompts[key] || typeof prompts[key] !== 'object') {
    prompts[key] = {
      'type': 'string',
      'default': val
    }
  } else {
    prompts[key]['default'] = val
  }
}