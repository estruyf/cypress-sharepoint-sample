// @ts-check
/// <reference types="cypress" />

describe('SharePoint SPFx Testing', function() {
  const PAGE_URL = "https://estruyfdev2.sharepoint.com/sites/ECS2019";
  
  /**
   * Before visiting SharePoint, we first need to authenticate
   */
  before(() =>  {
    cy.visitSP(PAGE_URL);

    cy.server({
      onAnyRequest: (route,  proxy) => {
        console.log(proxy.url)
      }
    });
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
  // it('Validate page title', () => {
  //   cy.title().should('eq', 'SPFx - Azure DevOps - Home');
  // });
  
  it('Edit the page', () => {
    cy.get(getSpTestId("pageCommandBarEditButton")).should('exist').click();
  });

  it('Edit the web part', () => {
    cy.get(`${getSpTestId("CanvasSection")} ${getSpTestId("ControlZone")} ${getSpTestId("canvas-control-toolbar")}`).should('exist').click({ force: true });
    cy.get(`${getSpTestId("ControlZone")} ${getSpTestId("configureButton")}`).should('exist').click();
  });

  it('Edit property pane with boys', () => {
    const imgType = "boy";
    cy.get(`#spPropertyPaneContainer`).should('exist');
    cy.get(`#spPropertyPaneContainer input`).should('exist').focus().clear().type(imgType);
    cy.get(getCyTestId(`brickheadz-elm`)).should('have.length', 2).should('have.attr', 'data-type', imgType);
  });

  it('Edit property pane with girls', () => {
    const imgType = "girl";
    cy.get(`#spPropertyPaneContainer input`).should('exist').focus().clear().type(imgType);
    cy.get(getCyTestId(`brickheadz-elm`)).should('have.length', 2).should('have.attr', 'data-type', imgType);
  });

  it('Save the page', () => {
    cy.get(getSpTestId("pageCommandBarSaveButton")).should('exist').click().should('not.exist');
  });
});

function getCyTestId(id) {
  return `[data-testid="${id}"]`;
}

function getSpTestId(id) {
  return `[data-automation-id="${id}"]`;
}