/// <reference types="cypress" />

context('Scheduled Page', () => {
  beforeEach(() => cy.visit('/'))

  it('will route to page', () => {
    cy.url().should('include', 'schedule')
  })
})
