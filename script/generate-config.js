const fs = require('fs');
const path = require('path');

// Fetch the sample file
const config = fs.readFileSync(path.join(__dirname, '../cypress.sample.json'), { encoding: "utf8" });

// Adding the username and password from the variable group
const configJson = JSON.parse(config);
configJson.env = {
  username: process.env.USERNAME,
  password: process.env.PASSWORD
};

// Rename the junit file based on the browser used
configJson.reporterOptions.mochaFile = `cypress/reports/junit.${process.env.BROWSER || "unknown"}-[hash].xml`;

// Check if there is a project ID specified
if (process.env.PROJECTID) {
  configJson.projectId = process.env.PROJECTID;
}

// Logging the config
if (process.env.VERBOSE) {
  console.log(configJson);
}

fs.writeFileSync(path.join(__dirname, `../cypress${process.env.CI ? "" : ".test"}.json`), JSON.stringify(configJson, null, 2));