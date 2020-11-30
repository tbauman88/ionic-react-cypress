import 'cy-mobile-commands'
/// <reference types="cypress" />

context('Scheduled Page', () => {
  beforeEach(() => cy.visit('/tabs/schedule'))

  it('will route to page', () => {
    cy.visit('/')
    cy.get('[data-cy=button-skip]')
      .click()
      .url()
      .should('include', 'schedule')
  })

  it('will display the tabs on the schedule page', () => {
    cy.get('[data-cy=segment-all]')
      .should('have.class', 'segment-button-checked')

    cy.get('[data-cy=segment-favorites]')
      .should('be.visible')
      .and('not.have.class', 'segment-button-checked')
  })

  it('will highlight the schedule navigation buttons', () => {
    cy.get('[data-cy=menu-schedule]').should('have.class', 'selected')
    cy.get('[data-cy=tab-schedule]').should('have.class', 'tab-selected')
  })

  it('will add scheduled session to favourites', () => {
    cy.get('[data-cy=session-8]')
      .click({ force: true })
      .url()
      .should('include', 'schedule/8')

    cy.get('[data-cy=favorite-icon]').click()

    cy.get('[data-cy=menu-schedule]')
      .click()
      .url()
      .should('include', '/tabs/schedule')

    cy.get('[data-cy=segment-favorites]').click()

    cy.get('[data-cy=session-8] > ion-label')
      .should('include.text', 'Laravel Dusk')
  })

  it('will display the correct filtered sessions', () => {
    cy.get('[data-cy=filter-icon]').click();
    cy.get('[data-cy=reset-button]').click();
    cy.get('[data-cy=Food-filter]').click();
    cy.get('[data-cy=React-filter]').click();
    cy.get('[data-cy=done-button]').click();
    cy.get('[data-cy*=session-]').parent().should('have.class', 'track-food')
  });

  it('will display "no sessions found" when no tracks selected to filter', () => {
    cy.get('[data-cy=filter-icon]').click();
    cy.get('[data-cy=reset-button]').click();
    cy.get('[data-cy=Food-filter]').click();
    cy.get('[data-cy=Food-filter]').click();
    cy.get('[data-cy=done-button]').click();

    cy.get('[data-cy=no-sessions-found]').should('be.visible');
  })

  it('will display correct search results', () => {
    const searchTerm = 'React';
    cy.get('[data-cy=search-icon]').click();
    cy.get('[data-cy=search-bar]').type(searchTerm);

    cy.get('[data-cy=no-sessions-found]').should('not.be.visible');

    cy.get('[data-cy*=session-]').parent().should('include.text', searchTerm)
  })

  it('will display "no sessions found" when no search results', () => {
    cy.get('[data-cy=search-icon]').click();
    cy.get('[data-cy=search-bar]').type('there should be no results');

    cy.get('[data-cy=no-sessions-found]').should('be.visible');
    cy.get('[data-cy*=session-]').should('have.length', 0)
  });

  it('will bring me to the session detail page when item is clicked from the schedule', () => {
    cy.get('[data-cy=session-1]').click({ force: true }).url().should('include', '/1')
  })

  it('will display all social media links when share button is clicked', () => {
    cy.get('[data-cy=share-social-icon]').click()
    cy.get('[data-cy=share-on-vimeo]').should('be.visible')
    cy.get('[data-cy=share-on-instagram]').should('be.visible')
    cy.get('[data-cy=share-on-twitter]').should('be.visible')
    cy.get('[data-cy=share-on-facebook]').should('be.visible')
  })

  it('will add session to favourites list when item is slid', () => {
    cy.visitMobile('/tabs/schedule')
    cy.get('[data-cy=search-icon]').click();
    cy.get('[data-cy=session-1]').swipe('right', 'left')
    cy.get('[data-cy=favorite-add-1]').should('be.visible').click({ force: true })
    cy.get('.alert-button').click()
    cy.get('[data-cy=segment-favorites]').click()
    cy.get('[data-cy*=session-] > ion-label').should('include.text', 'React Tooling')
  });

  it('will remove session from favourites when item is slid', () => {
    const parentClasses = 'ion-list[style=""] > .item-group-md > .track-tooling'

    // Add favourite
    cy.visitMobile('/tabs/schedule')
    cy.get('[data-cy=search-icon]').click();
    cy.get('[data-cy=session-3]').swipe('right', 'left')
    cy.get('[data-cy=favorite-add-3]').should('be.visible').click({ force: true })
    cy.get('.alert-button').click()
    cy.get('[data-cy=segment-favorites]').click()

    // Remove favourite
    cy.get(`${parentClasses} > [data-cy=session-3]`).swipe('right', 'left')

    cy.get(`${parentClasses} > .item-options-md > [data-cy=favorite-remove-3]`)
      .should('be.visible')
      .click({ multiple: true })

    cy.get('.alert-button').contains('Remove').click()
    cy.get('[data-cy=session-3]').should('not.be.visible')
    cy.get('[data-cy=no-sessions-found]').should('be.visible');
  })
})
