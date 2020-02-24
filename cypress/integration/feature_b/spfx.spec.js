// @ts-check
/// <reference types="cypress" />



describe('SharePoint SPFx Testing', function() {
  const PAGE_URL = "https://estruyfdev2.sharepoint.com/sites/AutomatedUITests";
  
  /**
   * Before visiting SharePoint, we first need to authenticate
   */
  before(() =>  {
    // cy.spAuth().visit(`${Cypress.env('appUrl')}`);

    cy.visit(PAGE_URL);
  });

  /**
   * After all tests
   */
  after(() => {
    cy.screenshot();
  });

  /**
   * Check if the homepage can be opened
   */
  it('Validate page title', () => {
    cy.title().should('eq', 'Visual UI Tests - Home');
  });

  it('Check if caption element is present in the web part', () => {
    const caption = cy.get('div[data-ui-test-id="caption"]');
    caption.should('exist');
    const captionTitle = caption.get('p[data-ui-test-id="caption-title"]');
    captionTitle.should('exist');
  });

  it('Check if caption text is equal to "Visual UI Tests"', async () => {
    const captionTitle = cy.get('p[data-ui-test-id="caption-title"]');
    captionTitle.contains("Visual UI Tests");
  });
})