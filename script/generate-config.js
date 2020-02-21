const fs = require('fs');
const path = require('path');

const config = fs.readFileSync(path.join(__dirname, '../cypress.sample.json'), { encoding: "utf8" });
const configJson = JSON.parse(config);
configJson.env = {
  username: process.env.USERNAME,
  password: process.env.PASSWORD
};

configJson.reporterOptions.mochaFile = `cypress/reports/junit.${process.env.BROWSER || "unknown"}-[hash].xml`;

if (process.env.VERBOSE) {
  console.log(configJson);
}

fs.writeFileSync(path.join(__dirname, `../cypress${process.env.CI ? "" : ".test"}.json`), JSON.stringify(configJson, null, 2));