const spauth = require('node-sp-auth');

/**
 * SharePoint authentication via npm dependency
 */
module.exports.NodeAuth = async function (options = {}) {

  // Check if the required options are provided
  if (!options.username || !options.password) {
    throw new Error('Username or password missing.');
  }
  if (!options.pageUrl) {
    throw new Error('Login Url missing')
  }

  // Authenticate
  const data  = await spauth.getAuth(options.pageUrl, {
    username: options.username,
    password: options.password
  });

  return data;
}