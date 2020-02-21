// @ts-check
/// <reference types="cypress" />

describe('SharePoint SPFx Testing', function() {
  const PAGE_URL = "https://estruyfdev2.sharepoint.com/sites/ECS2019";
  
  /**
   * Before visiting SharePoint, we first need to authenticate
   */
  before(() =>  {
    cy.visit(PAGE_URL);
  });

  /**
   * Check if the homepage can be opened
   */
  it('Validate page title', () => {
    cy.title().should('eq', 'SPFx - Azure DevOps - Home');
  });
  
  /**
   * Validate what you want to validate
   */
  it('Validate if there are two images on the page', () => {
    cy.get('div[data-ui-test-id="brickheadz"] img').should('have.length', 2);
  });
})