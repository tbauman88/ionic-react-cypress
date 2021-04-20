describe('My First Test', () => {
  it('visits our schedule page', () => {
    cy.visit("/tutorial")
    
    cy.get('[data-testid=button-skip]').click()
    
    cy.url().should('include', '/tabs/schedule')
  })

  it('opens a scheduled task', () => {
    cy.visit("/tabs/schedule").wait(1000)

    cy.get('[data-testid=session-4]').click({ force: true })

    cy.wait(1000)

    cy.contains('University of TypeScript')
  })

  it.only('should change background color when in dark mode', () => {
    cy.visit("/tabs/schedule").wait(1000)

    cy.get('[data-testid=dark-mode-toggle]').click({ force: true })

    cy.wait(1000)

    cy.get('.toolbar-background').should('have.css', 'background-color', '#121212')
  })
})
