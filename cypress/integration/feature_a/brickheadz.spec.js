// @ts-check
/// <reference types="cypress" />

describe('SharePoint SPFx Testing', function() {
  const PAGE_URL = "https://estruyfdev2.sharepoint.com/sites/ECS2019";
  
  /**
   * Before visiting SharePoint, we first need to authenticate
   */
  before(() =>  {
    cy.visitSP(PAGE_URL);
  });

  /**
   * After all tests
   */
  after(() => {
    // Wait 1sec for the video
    cy.wait(1000);
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
    cy.get('div[data-testid="brickheadz"] img').should('have.length', 2);
  });
})