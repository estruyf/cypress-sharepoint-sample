/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    visitWithAuth(pageUrl: string): Chainable<void>
  }
}