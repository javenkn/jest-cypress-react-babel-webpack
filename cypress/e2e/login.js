import {buildUser} from '../support/generate'

describe('login', () => {
  it('should login an existing user', () => {
    const user = buildUser()
    cy.request({
      method: 'POST',
      url: 'http://localhost:3000/register',
      body: user,
    })
    cy.visit('/')
      .findByText(/login/i)
      .click()
      .findByLabelText(/username/i)
      .type(user.username)
      .findByLabelText(/password/i)
      .type(user.password)
      .findByText(/submit/i)
      .click()

      // verifying user has login
      .url()
      .should('eq', `${Cypress.config().baseUrl}/`)
      .window()
      .its('localStorage.token')
      .should('be.a', 'string')
      .findByTestId('username-display')
      .should('have.text', user.username)
  })
})
