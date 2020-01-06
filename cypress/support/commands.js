import {buildUser} from '../support/generate'

Cypress.Commands.add('createUser', overrides => {
  const user = buildUser(overrides)
  cy.request({
    method: 'POST',
    url: 'http://localhost:3000/register',
    body: user,
  }).then(response => ({...response.body.user, ...user}))
})

Cypress.Commands.add('login', user => {
  cy.request({
    method: 'POST',
    url: 'http://localhost:3000/login',
    body: user,
  }).then(response => {
    window.localStorage.setItem('token', response.body.user.token)
    return {...response.body.user, ...user}
  })
})

Cypress.Commands.add('loginAsNewUser', () => {
  cy.createUser().then(user => {
    cy.login(user)
  })
})

Cypress.Commands.add('assertHome', () => {
  cy.url().should('eq', `${Cypress.config().baseUrl}/`)
})

Cypress.Commands.add('assertLoggedInAs', user => {
  cy.window()
    .its('localStorage.token')
    .should('be.a', 'string')
    .findByTestId('username-display')
    .should('have.text', user.username)
})
