export enum EventType {
  CLICK = 'click',
  CHANGE = 'change',
  DBLCLICK = 'dblclick',
  KEYDOWN = 'keydown',
  SUBMIT = 'submit',
}

export enum ControlAction {
  START,
  STOP,
  SAVE,
  RESET,
  DELETE,
  MOVE,
  PUSH,
  VIEW,
  RUN,
  RUNALL
}

export enum RecState {
  ON,
  OFF,
  PAUSED,
}
export const codeSnippet = `describe('test_name', function() {

  it('what_it_does', function () {

    cy.viewport(1600, 762)

    cy.visit('https://prisma.mediaocean.com/campaign-management/#osAppId=prsm-cm-spa&osPspId=prsm-cm-home')

    cy.get('div > #cm-home-container > #prisma-home-container > #campaignListPnl > #cs-toolbar').click()

    cy.get('#prisma-home-container > #campaignListPnl > #cs-toolbar > .quick-add > #gwt-debug-idesk-home-add-campaign').click()

  })

})`
