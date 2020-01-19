// This goes in cypress/plugins/index.js
const SharePointLogin = require('./sharepoint-login/').SharePointLogin

module.exports = (on, config) => {
  on('task', { SharePointLogin })
}