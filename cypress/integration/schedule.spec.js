/// <reference types="cypress" />


context('Scheduled Page', () => {
  it('will route to page', () => {
    cy.visit('/')

    cy.get('[data-cy=button-skip]')
      .click()
      .url().should('include', 'schedule')
  })

  it('will display the tabs on the schedule page', () => {
    cy.visit('/tabs/schedule')
    cy.wait(500);

    cy.get('[data-cy=segment-all]')
      .should('have.class', 'segment-button-checked')

    cy.get('[data-cy=segment-favorites]')
      .should('be.visible')
      .should('not.have.class', 'segment-button-checked')
  })

  it('will highlight the schedule navigation buttons', () => {
    cy.visit('/tabs/schedule')
    cy.wait(500);

    cy.get('[data-cy=menu-schedule]').should('have.class', 'selected')
    cy.get('[data-cy=tab-schedule]').should('have.class', 'tab-selected')
  })

  it('will add scheduled session to favourites', () => {
    cy.visit('/tabs/schedule')
    cy.wait(500);

    cy.get('[data-cy=session-8]')
      .click({ force: true })
      .url()
      .should('include', 'schedule/8')

    cy.get('[data-cy=favorite-icon]').click()

    cy.get('[data-cy=menu-schedule]')
      .click()
      .url()
      .should('include', '/tabs/schedule')

    cy.get('ion-segment-button[value="favorites"]').click()

    cy.get('[data-cy=session-8] > ion-label')
      .should('include.text', 'Laravel Dusk')
  })
})
