// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })


Cypress.Commands.add('spAuth', function () {
  const options = {
    username: Cypress.env('username'),
    password: Cypress.env('password'),
    pageUrl: Cypress.env('appUrl')
  };
  
  cy.task('SharePointLogin', options).then(result => {
    cy.clearCookies();
    
    result.cookies.forEach(cookie => {
      cy.setCookie(cookie.name, cookie.value, {
        domain: cookie.domain,
        expiry: cookie.expires,
        httpOnly: cookie.httpOnly,
        path: cookie.path,
        secure: cookie.secure
      });
      Cypress.Cookies.preserveOnce(cookie.name);
    });
  });
});

/**
 * Allows you to first grab an access token before opening the SharePoint page
 */
Cypress.Commands.add("visitWithAdal", (pageUrl) => { 
  const config = {
    username: process.env.CI ? Cypress.env('USERNAME') : Cypress.env('username'),
    password: process.env.CI ? Cypress.env('PASSWORD') : Cypress.env('password'),
    tenant: process.env.CI ? Cypress.env('TENANT') : Cypress.env('tenant'),
    clientId: process.env.CI ? Cypress.env('CLIENTID') : Cypress.env('clientid'),
    clientSecret: process.env.CI ? Cypress.env('CLIENTSECRET') : Cypress.env('clientsecret'),
    resource: process.env.CI ? Cypress.env('RESOURCE') : Cypress.env('resource')
  };

  // Fetch the access token for the Microsoft Graph
  cy.request({
    method: 'POST',
    url: `https://login.microsoft.com/${config.tenant}/oauth2/token`,
    headers: {
       'cache-control': 'no-cache',
       'Content-Type': 'application/x-www-form-urlencoded'
    },
    form: true,
    body: {
      grant_type: 'password',
      client_id: config.clientId,
      client_secret: config.clientSecret,
      resource: config.resource,
      password: config.password,
      username: config.username
    }
  }).then(response => {
    if (response && response.status === 200 && response.body) {
      const accessToken = response.body["access_token"];
      const expires = response.body["expires_on"];
      // Store the retrieved access token in the session storage
      cy.window().then((crntWindow) => {
        crntWindow.sessionStorage.setItem(`adal.token.keys`, `${config.resource}|`);
        crntWindow.sessionStorage.setItem(`adal.expiration.key${config.resource}`, expires);
        crntWindow.sessionStorage.setItem(`adal.access.token.key${config.resource}`, accessToken);
        
        cy.visitSP(pageUrl);
      });
    }
  });
});

/**
 * Visit SharePoint Page
 */
Cypress.Commands.add("visitSP", (pageUrl) => {
  const config = {
    username: process.env.CI ? Cypress.env('USERNAME') : Cypress.env('username'),
    password: process.env.CI ? Cypress.env('PASSWORD') : Cypress.env('password'),
    pageUrl
  };

  cy.task('NodeAuth', config).then((data) => {
    cy.visit(config.pageUrl, {
      headers: data.headers,
      onBeforeLoad: (win) => {
        console.log("ONBEFORELOAD", pageUrl);
        // onBeforeLoad not working in override: https://github.com/cypress-io/cypress/issues/5633
        // Let the child think it runs in the parent
        win["parent"] = win;
      }
    });
  });
});

/**
 * Overwriting the original visit Cypress function to add authentication
 */
// Cypress.Commands.overwrite("visit", (originalFn, pageUrl, options) => { 
//   const config = {
//     username: process.env.CI ? Cypress.env('USERNAME') : Cypress.env('username'),
//     password: process.env.CI ? Cypress.env('PASSWORD') : Cypress.env('password'),
//     pageUrl
//   };

//   cy.task('NodeAuth', config).then((data) => {
//     originalFn({
//       method: "GET",
//       url: pageUrl,
//       headers: data.headers
//     });
//   });
// });