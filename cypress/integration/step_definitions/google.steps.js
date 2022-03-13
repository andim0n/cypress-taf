import { defineStep } from 'cypress-cucumber-preprocessor/steps'
import googlePage from '../../pages/google.page'

defineStep('the user navigates to the {string}', (url) => {
  cy.visit(url)
})

defineStep('the URL contains {string}', (text) => {
  cy.location().its('host').should('contain', text)
})

defineStep('the user enters {string} in the search field', (text) => {
  cy.get(googlePage.input).type(text)
})
