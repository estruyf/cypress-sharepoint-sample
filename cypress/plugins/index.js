// This goes in cypress/plugins/index.js
const SharePointLogin = require('./sharepoint-login/').SharePointLogin;
const NodeAuth = require('./node-auth/').NodeAuth;

module.exports = (on, config) => {
  on('task', { SharePointLogin }),
  on('task', { NodeAuth })
};