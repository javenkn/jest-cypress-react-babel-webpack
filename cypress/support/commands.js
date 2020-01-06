import {buildUser} from '../support/generate'

Cypress.Commands.add('createUser', () => {
  const user = buildUser()
  cy.request({
    method: 'POST',
    url: 'http://localhost:3000/register',
    body: user,
  }).then(response => ({...response.body.user, ...user}))
})
