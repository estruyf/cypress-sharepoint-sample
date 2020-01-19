describe('SharePoint SPFx Testing', function() {
 
  /**
   * Before visiting SharePoint, we first need to authenticate
   */
  before(function() {
    cy.spAuth();
  });

  /**
   * Check if the homepage can be opened
   */
  it('Can open the homepage', function() {
    cy.visit(`${Cypress.env('appUrl')}`);
  });
  
  /**
   * Validate what you want to validate
   */
  it('Validate if there are two images on the page', async () => {
    const elms = await cy.get('div[data-ui-test-id="brickheadz"] img');
    return expect(elms).to.be.length(2);
  });
})