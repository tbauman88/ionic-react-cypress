import 'cy-mobile-commands'
/// <reference types="cypress" />

context('Account', () => {
  beforeEach(() => cy.visit('/tabs/schedule'));

  it('will sign up for an account', () => {
    const username = 'Foobar';

    cy.get('[data-cy=menu-signup]').click();
    cy.get('[data-cy=username-signup]').type(username);
    cy.get('[data-cy=password-signup]').type('p455w0rd');
    cy.get('[data-cy=create-signup]').click()

    cy.get('[data-cy=menu-account]').should('be.visible').click()
    cy.get('[data-cy=username]').should('be.visible').and('contain', username)
  })

  it('will require a username to login', () => {
    cy.get('[data-cy=menu-login]').click();

    cy.get('[data-cy=login-button]').click();
    cy.get('[data-cy=username-error]').should('be.visible').and('contain', 'Username is required'); 
  })

  it('will require a password to login', () => {
    cy.get('[data-cy=menu-login]').click();

    cy.get('[data-cy=login-button]').click();
    cy.get('[data-cy=password-error]').should('be.visible').and('contain', 'Password is required'); 
  })

  it('will login to the app', () => {
    const username = 'felipe-the-canadian-res';

    cy.get('[data-cy=menu-login]').click();
    cy.get('[data-cy=username-login]').type(username);
    cy.get('[data-cy=password-login]').type('p455w0rd');
    cy.get('[data-cy=login-button]').click()

    cy.get('[data-cy=menu-account]').should('be.visible').click()
    cy.get('[data-cy=username]').should('be.visible').and('contain', username)
  })

  it('will swipe through the tutorial', () => {
    cy.visitMobile('/tabs/schedule')
    cy.get('[data-cy=menu-tutorial]').click();

    cy.get('[data-cy=tutorial-slide-1]').should('be.visible');
    cy.get('[data-cy=tutorial-slides]').swipe('right', 'left').wait(500);
    cy.get('[data-cy=tutorial-slide-2]').should('be.visible');
    cy.get('[data-cy=tutorial-slides]').swipe('right', 'left').wait(500);
    cy.get('[data-cy=tutorial-slide-3]').should('be.visible');
    cy.get('[data-cy=tutorial-slides]').swipe('right', 'left').wait(500);
    cy.get('[data-cy=tutorial-slide-4]').should('be.visible');

    cy.get('[data-cy=continue-button]').should('be.visible').click()

    cy.url().should('contain', 'schedule')
  })

  it('will update username', () => {
    const username = 'Foobar';
    cy.get('[data-cy=menu-signup]').click();
    cy.get('[data-cy=username-signup]').type(username);
    cy.get('[data-cy=password-signup]').type('p455w0rd');
    cy.get('[data-cy=create-signup]').click()
    
    cy.get('[data-cy=menu-account]').click();
    cy.get('[data-cy=username-change]').click();
    
    cy.get('[id*=alert-input]').clear().type('Foo')
    cy.get('.alert-button').contains('Ok').click();
    cy.get('[data-cy=username]').should('contain', 'Foo');
  })

  it('will submit a support issue', () => {
    const message = 'I think the only difference between me and the other placeholder text is that I’m more honest and my words are more beautiful.'
    cy.get('[data-cy=menu-support]').click();
    cy.get('[data-cy=support-message]').type(message);
    cy.get('[data-cy=support-submit]').click();
    // It's all about the shadow DOM
    cy.get('ion-toast').shadow().contains('Your support request has been sent')
  })

  it('will require a message to submit a support issue', () => {
    cy.get('[data-cy=menu-support]').click();
    cy.get('[data-cy=support-submit]').click();
    cy.get('[data-cy=support-error]').should('be.visible').and('contain', 'Support message is required'); 
  })

  it('will change the application to dark mode', () => {
    cy.get('[data-cy=dark-mode-toggle]').click().should('have.class', 'toggle-checked')
    cy.get('ion-app').should('have.class', 'dark-theme')
  })

  it('will logout of the app', () => {
    const login = () => {
      const username = 'felipe-the-canadian-res';

      cy.get('[data-cy=menu-login]').click();
      cy.get('[data-cy=username-login]').type(username);
      cy.get('[data-cy=password-login]').type('p455w0rd');
      cy.get('[data-cy=login-button]').click()
    };

    login();
    
    cy.get('[data-cy=menu-logout]').click();

    cy.get('[data-cy=menu-login]').should('exist');
    cy.get('[data-cy=menu-signup]').should('exist');
  })
})
