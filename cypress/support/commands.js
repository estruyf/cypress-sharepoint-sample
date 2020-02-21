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
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })


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


Cypress.Commands.add('visitWithAuth', async (pageUrl) => {
  const options = {
    username: process.env.CI ? Cypress.env('USERNAME') : Cypress.env('username'),
    password: process.env.CI ? Cypress.env('PASSWORD') : Cypress.env('password'),
    pageUrl
  };
  
  try {
    const data = await cy.task('NodeAuth', options);
    return cy.visit({
      method: "GET",
      url: pageUrl,
      headers: data.headers
    });
  } catch (error) {
    console.log(Cypress.env());
    console.log(error.message);
    throw error;
  }
});