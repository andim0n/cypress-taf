import { defineStep, Given } from 'cypress-cucumber-preprocessor/steps'

defineStep('first step', () => {
  cy.console.log(1)
})
defineStep('second step', () => {
  cy.console.log(1)
})

Given('first step', () => {
  cy.console.log(1)
})
