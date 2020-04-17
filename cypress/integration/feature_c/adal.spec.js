// @ts-check
/// <reference types="cypress" />

describe('SharePoint SPFx Testing', function() {
  const PAGE_URL = "https://estruyfdev2.sharepoint.com/sites/ESPC19/SitePages/Graph-visualizer.aspx";
  
  /**
   * Before visiting SharePoint, we first need to authenticate
   */
  before(() =>  {
    cy.visitWithAdal(PAGE_URL);
  });

  /**
   * After all tests
   */
  after(() => {
    // Wait 1sec for the video
    cy.wait(1000);
  });

  /**
   * Validate if a loading message is shown
   */
  it('Validate loading message', () => {
    cy.get('p[data-automation-id="loading"]').should('have.length', 1);
  });
  
  /**
   * Validate what you want to validate
   */
  it('Validate if users are fetched', () => {
    const usersMsgElm = cy.get('h1[data-automation-id="users"]');
    usersMsgElm.contains("User count: 8");
  });
})