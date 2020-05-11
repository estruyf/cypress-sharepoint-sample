/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    // Add custom commands if needed
    visitWithAdal: (pageUrl: string) => void
    visitSP: (pageUrl: string) => void
  }
}