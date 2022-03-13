// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

import 'cypress-file-upload'
import '@testing-library/cypress/add-commands'
// import neatCSV from 'neat-csv'
// const { neatCSV } = require('neat-csv')

const jwt = require('jsonwebtoken')
const dayjs = require('dayjs')
require('cypress-get-table')

const WAIT_BEFORE_SEARCH_TIMEOUT = 1500

Cypress.Commands.add('getRequest', (requestUrl, queryParameters, accessToken) => {
  cy.request({
    url: requestUrl,
    method: 'GET',
    qs: queryParameters,
    followRedirect: false,
    auth: {
      bearer: accessToken,
    },
    headers: {
      accept: 'application/json',
    },
  })
})

Cypress.Commands.add('getFailRequest', (requestUrl, queryParameters, accessToken) => {
  cy.request({
    url: requestUrl,
    method: 'GET',
    qs: queryParameters,
    followRedirect: false,
    auth: {
      bearer: accessToken,
    },
    headers: {
      accept: 'application/json',
    },
    failOnStatusCode: false,
  })
})

Cypress.Commands.add('postRequest', (requestUrl, requestBody, accessToken) => {
  cy.request({
    url: requestUrl,
    method: 'POST',
    body: requestBody,
    followRedirect: false,
    auth: {
      bearer: accessToken,
    },
    headers: {
      accept: 'application/json',
    },
  })
})

Cypress.Commands.add('postFailRequest', (requestUrl, requestBody, accessToken) => {
  cy.request({
    url: requestUrl,
    method: 'POST',
    body: requestBody,
    followRedirect: false,
    auth: {
      bearer: accessToken,
    },
    headers: {
      accept: 'application/json',
    },
    failOnStatusCode: false,
  })
})

Cypress.Commands.add('putRequest', (requestUrl, requestBody, accessToken) => {
  cy.request({
    url: requestUrl,
    method: 'PUT',
    body: requestBody,
    followRedirect: false,
    auth: {
      bearer: accessToken,
    },
    headers: {
      accept: 'application/json',
    },
  })
})

Cypress.Commands.add('putFailRequest', (requestUrl, requestBody, accessToken) => {
  cy.request({
    url: requestUrl,
    method: 'PUT',
    body: requestBody,
    followRedirect: false,
    auth: {
      bearer: accessToken,
    },
    headers: {
      accept: 'application/json',
    },
    failOnStatusCode: false,
  })
})

/**
 *  ---------------------------- Common ---------------------------------
 */

Cypress.Commands.add('login', (user) => {
  expect(user.username).to.exist
  expect(user.password).to.exist

  cy.visit('/')
  cy.get('input#username').type(user.username)
  cy.get('input#password').type(user.password, {
    log: false,
  })
  cy.get('input#kc-login').click()
})

Cypress.Commands.add('logout', () => {
  return cy.root().get(`[data-cy-topbar-user]`).click().root().get('[data-cy-user-item="logout"]').click({
    force: true,
  })
})

Cypress.Commands.add('getTitleByKey', (key) => {
  return cy.root().get(`[data-cy-title="${key}"]`)
})

Cypress.Commands.add('getElementByKey', (key) => {
  return cy.root().get(`[data-cy-el="${key}"]`)
})

Cypress.Commands.add('selectMenu', (menuItem, menuSubItem) => {
  return menuSubItem
    ? cy
        .get(`[data-cy-menu-item="${menuItem}"]`)
        .eq(0)
        .parent()
        .find(`ul [data-cy-menu-item="${menuSubItem}"]`, {
          force: true,
        })
        .click({
          force: true,
        })
        .confirmFormLeaving()
    : cy.get(`[data-cy-menu-item="${menuItem}"]`).click({ force: true }).confirmFormLeaving()
})

Cypress.Commands.add('getPageTitle', (title, getByKey = false) => {
  return getByKey ? cy.root().get(`[data-cy-page-title="${title}"]`) : cy.root().get('h1').contains(title)
})

Cypress.Commands.add('getButtonByLabel', (label) => {
  return cy
    .wait(WAIT_BEFORE_SEARCH_TIMEOUT)
    .root()
    .get(`button`)
    .contains(new RegExp('^\\s*' + label + '\\s*$', 'g'))
})

Cypress.Commands.add('getButtonByTooltip', (tooltip) => {
  return cy.wait(WAIT_BEFORE_SEARCH_TIMEOUT).root().get(`button[aria-label="${tooltip}"]`)
})

Cypress.Commands.add('getButtonByKey', (key) => {
  return cy.wait(WAIT_BEFORE_SEARCH_TIMEOUT).root().get(`[data-cy-btn="${key}"]`)
})

Cypress.Commands.add('goBack', () => {
  return cy.wait(WAIT_BEFORE_SEARCH_TIMEOUT).root().get(`page-title button`).click()
})

Cypress.Commands.add('getLinkByLabel', (label) => {
  return cy
    .wait(WAIT_BEFORE_SEARCH_TIMEOUT)
    .root()
    .get(`a`)
    .contains(new RegExp('^\\s*' + label + '\\s*$', 'g'))
})

Cypress.Commands.add('getLinkByTooltip', (tooltip) => {
  return cy.wait(WAIT_BEFORE_SEARCH_TIMEOUT).root().get(`a[ptooltip="${tooltip}"]`)
})

Cypress.Commands.add('getLinkByKey', (key) => {
  return cy.wait(WAIT_BEFORE_SEARCH_TIMEOUT).get(`[data-cy-btn="${key}"]`)
})

Cypress.Commands.add('getElementByLabel', (label) => {
  return cy
    .findByText(label)
    .then((el) => el.get(0).id)
    .then((id) => cy.get(`[aria-labelledby="${id}"]`))
})

Cypress.Commands.add('selectTab', (label) => {
  return cy.get('[role="tab"] a').contains(label).click()
})

Cypress.Commands.add('clickOutside', () => {
  return cy.get('body').click(0, 0)
})

Cypress.Commands.add('getByDataTest', (id, options) => cy.get(`[data-test=${id}]`, options))

Cypress.Commands.add('getSessionStorage', (key) => {
  cy.window().then((window) => window.sessionStorage.getItem(key))
})

Cypress.Commands.add('setSessionStorage', (key, value) => {
  cy.window().then((window) => {
    window.sessionStorage.setItem(key, value)
  })
})

/**
 *  ---------------------------- Toasts ---------------------------------
 */

Cypress.Commands.add('getToastTitle', () => {
  return cy.root().get(`[data-cy-toast-summary]`)
})

Cypress.Commands.add('getToastMessage', (message) => {
  return cy.root().get(`[data-cy-toast-detail="${message}"]`)
})

Cypress.Commands.add('checkToastContent', (title, message) => {
  return cy.root().getToastTitle().should('contain.text', title).getToastMessage(message)
})

Cypress.Commands.add('closeToast', () => {
  return cy.root().get('button[data-cy-btn="closeToast"]').click()
})

/**
 *  ---------------------------- Forms ---------------------------------
 */

Cypress.Commands.add('getInputByLabel', (label) => {
  return cy.root().findByLabelText(label)
})

Cypress.Commands.add('getInputByKey', (key) => {
  return cy.root().get(`[data-cy-input="${key}"]`)
})

Cypress.Commands.add('getInputByPlaceholder', (placeholder) => {
  return cy.root().findByPlaceholderText(placeholder)
})

Cypress.Commands.add('getCheckboxByLabel', (label) => {
  return cy.root().findByLabelText(label).parent().parent()
})

Cypress.Commands.add('getCheckboxByKey', (key) => {
  return cy.root().get(`[data-cy-checkbox="${key}"]`)
})

Cypress.Commands.add('getDropdownByLabel', (label) => {
  return cy.root().findByLabelText(label).parent().parent().parent()
})

Cypress.Commands.add('getDropdownByKey', (key) => {
  return cy.root().get(`[data-cy-dropdown="${key}"]`)
})

Cypress.Commands.add('getDropdownByPlaceholder', (placeholder) => {
  return cy.root().get('p-dropdown span').contains(placeholder).parent().parent().parent()
})

Cypress.Commands.add('getMultiselectByLabel', (label) => {
  return cy.root().findByLabelText(label).parent().parent().parent()
})

Cypress.Commands.add('getMultiselectByKey', (key) => {
  return cy.root().get(`[data-cy-dropdown="${key}"]`)
})

Cypress.Commands.add('getMultiselectByPlaceholder', (placeholder) => {
  return cy.root().get('p-multiselect .p-placeholder').contains(placeholder).parent().parent().parent()
})

Cypress.Commands.add('getAutocompleteByLabel', (label) => {
  return cy.root().findByLabelText(label).parentsUntil('autocomplete').parent()
})

Cypress.Commands.add('getAutocompleteByKey', (key) => {
  return cy.root().get(`[data-cy-autocomplete="${key}"]`)
})

Cypress.Commands.add('getHTMLEditorByPlaceholder', (placeholder) => {
  return cy.root().get(`quill-editor div[data-placeholder="${placeholder}"]`).parent().parent()
})

Cypress.Commands.add('getAutocompleteByPlaceholder', (placeholder) => {
  return cy.root().findByPlaceholderText(placeholder).parentsUntil('autocomplete').parent()
})

Cypress.Commands.add('selectInputValue', (params) => {
  const searchAttribute = params.label || params.placeholder || params.key
  const searchMethodName = params.label
    ? 'getInputByLabel'
    : params.placeholder
    ? 'getInputByPlaceholder'
    : 'getInputByKey'

  return cy[searchMethodName](searchAttribute).clear().type(params.value)
})

Cypress.Commands.add('selectHTMLValue', (params) => {
  const searchAttribute = params.label || params.placeholder || params.key
  const searchMethodName = params.label
    ? 'getInputByLabel'
    : params.placeholder
    ? 'getHTMLEditorByPlaceholder'
    : 'getInputByKey'

  return cy[searchMethodName](searchAttribute).find('p').clear().type(params.value)
})

Cypress.Commands.add('selectDropdownValue', (params) => {
  const searchAttribute = params.label || params.placeholder || params.key
  const isMultiselect = Array.isArray(params.value)
  const itemSelector = isMultiselect ? 'p-multiselectitem li span' : 'p-dropdownitem li span'
  let searchMethodName

  if (Array.isArray(params.value)) {
    searchMethodName = params.label
      ? 'getMultiselectByLabel'
      : params.placeholder
      ? 'getMultiselectByPlaceholder'
      : 'getMultiselectByKey'
  } else {
    searchMethodName = params.label
      ? 'getDropdownByLabel'
      : params.placeholder
      ? 'getDropdownByPlaceholder'
      : 'getDropdownByKey'
  }

  return cy
    .root()
    [searchMethodName](searchAttribute)
    .click()
    .then(() => {
      ;(isMultiselect ? params.value : [params.value]).forEach((option) => {
        cy.get(itemSelector)
          .contains(new RegExp(`^\\s?${option}\\s?$`))
          .click()
      })
    })
})

Cypress.Commands.add('selectAutocompleteValue', (params) => {
  const searchAttribute = params.label || params.placeholder || params.key
  const searchMethodName = params.label
    ? 'getAutocompleteByLabel'
    : params.placeholder
    ? 'getAutocompleteByPlaceholder'
    : 'getAutocompleteByKey'

  ;(Array.isArray(params.value) ? params.value : [params.value]).forEach((option) => {
    if (option) {
      cy[searchMethodName](searchAttribute)
        .find('input[type="text"]')
        .type(option)
        .parentsUntil('autocomplete')
        .find('.p-autocomplete-items li span')
        .contains(option)
        .wait(800)
        .click()
      // .contains(option)
      // .click();
    } else {
      cy[searchMethodName](searchAttribute).find('input[type="text"]').clear().blur()
    }
  })
})

Cypress.Commands.add('selectCheckboxValue', (params) => {
  if (params.label) {
    return cy.getInputByLabel(params.label).click({
      force: true,
    })
  }
  return cy.root().get(`[data-cy-checkbox="${params.key}"]`).click({
    force: true,
  })
})

Cypress.Commands.add('selectChipsValue', (params) => {
  const searchAttribute = params.label || params.key
  const searchMethodName = params.label ? 'getInputByLabel' : 'getInputByKey'

  params.value.forEach((option) => {
    cy[searchMethodName](searchAttribute).type(option).type('{enter}')
  })
})

Cypress.Commands.add('selectDatepickerValue', (params) => {
  const mounts = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ]
  const searchAttribute = params.label || params.placeholder || params.key || params.tableFilter
  const searchMethodName = params.label
    ? 'getInputByLabel'
    : params.placeholder
    ? 'getInputByPlaceholder'
    : params.tableFilter
    ? 'getTableFilter'
    : 'getElementByKey'

  cy.wait(1000)[searchMethodName](searchAttribute).click()
  ;(Array.isArray(params.value) ? params.value : [params.value]).forEach((date, index) => {
    const [year, month, day] = date.split('-')
    const containerSelector = Array.isArray(params.value)
      ? `bs-daterangepicker-container bs-days-calendar-view:nth-child(${index + 1})`
      : 'bs-datepicker-container'

    return cy
      .get(containerSelector)
      .find('button.current:nth-child(3)')
      .wait(1000)
      .click()
      .get(`table td`)
      .contains(year)
      .click()
      .get(`table td`)
      .contains(mounts[month - 1])
      .click()
      .get('table td span:not(.is-other-month)')
      .contains(+day)
      .click()
  })
})

Cypress.Commands.add('selectTimepickerValue', (params) => {
  const [hours, minutes] = params.value.split(':')
  cy.getInputByLabel(params.label).click().get('.hours').type(hours)

  if (minutes) {
    return cy.get('.minutes').type(minutes).root().click()
  } else {
    return cy.root().click()
  }
})

Cypress.Commands.add('confirmFormLeaving', () => {
  const leaveWarningSelector =
    '[data-cy-modal-message="Are you sure you want to leave the form? All unsaved data will be lost."]'

  if (Cypress.$(leaveWarningSelector).length) {
    cy.get('modal-container').getButtonByLabel('Yes').click()
  }
})

Cypress.Commands.add('getWarningMessage', () => {
  return cy.root().get(`[data-cy-modal-message]`)
})

Cypress.Commands.add('getInputErrorByLabel', (label) => {
  return cy.findByLabelText(label).next()
})

Cypress.Commands.add('selectRadiobuttonValue', (params) => {
  return cy.get(`input[type="radio"][value="${params.value}"]`).click({
    force: true,
  })
})

Cypress.Commands.add('toggleSwitchboxValue', (params) => {
  if (params.label) {
    return cy.getInputByLabel(params.label).next().click()
  } else if (params.text) {
    return cy.root().get(`[data-on-label="${params.text}"]`).click()
  }
  return cy.root().get(`[data-cy-switch="${params.key}"] label`).click()
})

Cypress.Commands.add('submitForm', (formKey) => {
  return formKey
    ? cy.root().get(`[data-cy-form="${formKey}"]`).get('button[type="submit"]').click()
    : cy.root().get('button[type="submit"]').click()
})

Cypress.Commands.add('getInputErrorByLabel', (label) => {
  return cy.findByLabelText(label).next()
})

Cypress.Commands.add('getInputErrorByKey', (key) => {
  return cy.getInputByKey(key).parent().get('[data-cy-form-error]')
})

Cypress.Commands.add('getDropdownErrorByLabel', (label) => {
  return cy.getDropdownByLabel(label).next()
})

Cypress.Commands.add('getDropdownErrorByKey', (key) => {
  return cy.getDropdownByKey(key).next()
})

Cypress.Commands.add('getAutocompleteErrorByLabel', (label) => {
  return cy.findByLabelText(label).parentsUntil('autocomplete').parent().next()
})

Cypress.Commands.add('getAutocompleteErrorByKey', (key) => {
  return cy.getAutocompleteByKey(key).next()
})

Cypress.Commands.add('isLabelMarkedAsRequired', (label) => {
  const check = (labelToCheck) =>
    cy
      .findByText(labelToCheck, {
        selector: 'label',
      })
      .should('have.attr', 'required')

  ;(Array.isArray(label) ? label : [label]).forEach((labelToCheck) => check(labelToCheck))
})

Cypress.Commands.add('isLabelNotMarkedAsRequired', (label) => {
  const check = (labelToCheck) =>
    cy
      .findByText(labelToCheck, {
        selector: 'label',
      })
      .should('not.have.attr', 'required')

  ;(Array.isArray(label) ? label : [label]).forEach((labelToCheck) => check(labelToCheck))
})

Cypress.Commands.add('isDropdownSorted', (params) => {
  const searchAttribute = params.label || params.placeholder || params.key
  const searchMethodName = params.label
    ? 'getDropdownByLabel'
    : params.placeholder
    ? 'getDropdownByPlaceholder'
    : 'getDropdownByKey'
  const options = []
  let isSorted = true

  ;(Array.isArray(searchAttribute) ? searchAttribute : [searchAttribute]).forEach((attribute) => {
    cy[searchMethodName](attribute)
      .click()
      [searchMethodName](attribute)
      .find('li')
      .then((list) =>
        list.each(function () {
          options.push(this.innerText)
        }),
      )
      .then(
        () => (isSorted = !!options.reduce((n, item) => n !== false && item.toLowerCase() >= n.toLowerCase() && item)),
      )
      .then(() => {
        if (!isSorted) {
          throw new Error(`The dropdown ${attribute} is not sorted alphabetically`)
        } else {
          cy.get('body').click({
            force: true,
          })
        }
      })
  })
})

Cypress.Commands.add('isAutocompleteSorted', (params) => {
  const searchAttribute = params.label || params.placeholder || params.key
  const searchMethodName = params.label
    ? 'getAutocompleteByLabel'
    : params.placeholder
    ? 'getAutocompleteByPlaceholder'
    : 'getAutocompleteByKey'
  const options = []
  let isSorted = true

  ;(Array.isArray(searchAttribute) ? searchAttribute : [searchAttribute]).forEach((attribute) => {
    cy[searchMethodName](attribute)
      .find('button.p-autocomplete-dropdown')
      .click()
      .parentsUntil('autocomplete')
      .find('.p-autocomplete-items li')
      .then((list) =>
        list.each(function () {
          options.push(this.innerText)
        }),
      )
      .then(() => console.log(options))
      .then(
        () => (isSorted = !!options.reduce((n, item) => n !== false && item.toLowerCase() >= n.toLowerCase() && item)),
      )
      .then(() => {
        if (!isSorted) {
          throw new Error(`The dropdown ${attribute} is not sorted alphabetically`)
        } else {
          cy.get('body').click({
            force: true,
          })
        }
      })
  })
})

Cypress.Commands.add('uploadFile', (filePath, inputKey) => {
  const selector = inputKey ? `[data-cy-input="${inputKey}"] input[type="file"]` : `input[type="file"]`

  return cy.get(selector).attachFile(filePath)
})

Cypress.Commands.add('checkInputPrependValue', (params) => {
  const searchAttribute = params.label || params.placeholder || params.key
  const searchMethodName = params.label
    ? 'getInputByLabel'
    : params.placeholder
    ? 'getInputByPlaceholder'
    : 'getInputByKey'

  return cy[searchMethodName](searchAttribute).should('have.value', params.value)
})

/**
 * ---------------------------- Tables ---------------------------------
 */

Cypress.Commands.add('getTableFilter', (key, tableKey) => {
  return tableKey
    ? cy.get(`[data-cy-table="${tableKey}"]`).get(`[data-cy-table-filter="${key}"]`)
    : cy.root().get(`[data-cy-table-filter="${key}"]`)
})

Cypress.Commands.add('selectTablePage', (pageNumber, tableKey) => {
  return tableKey
    ? cy.get(`[data-cy-table="${tableKey}"]`).get(`[data-cy-table-pagination]`).click().findByText(pageNumber).click()
    : cy.root().get(`[data-cy-table-pagination]`).findByText(pageNumber).click()
})

Cypress.Commands.add('selectTablePageSize', (pageSize, tableKey) => {
  return tableKey
    ? cy.get(`[data-cy-table="${tableKey}"]`).get(`[data-cy-table-pageselect]`).select(pageSize)
    : cy.root().get(`[data-cy-table-pageselect]`).select(pageSize)
})

Cypress.Commands.add('refreshTable', (tableKey) => {
  return tableKey
    ? cy.get(`[data-cy-table="${tableKey}"]`).get(`data-cy-table-refresh`).click()
    : cy.root().get(`[data-cy-table-refresh]`).click()
})

Cypress.Commands.add('getTableJSONData', (key) => {
  return key
    ? cy
        .get(`[data-cy-table="${key}"] table`)
        .wait(WAIT_BEFORE_SEARCH_TIMEOUT * 2)
        .getTable()
    : cy
        .get('table')
        .wait(WAIT_BEFORE_SEARCH_TIMEOUT * 2)
        .getTable()
})

Cypress.Commands.add('findTableRowByContent', (params, tableKey, throwIfNull = true) => {
  return cy.getTableJSONData(tableKey).then((data) => {
    const rowIndex = data.findIndex((row) => {
      return Object.keys(params).every((key) => {
        return row.hasOwnProperty(key) && params[key].trim() === row[key].trim()
      })
    })

    if (rowIndex === -1 && throwIfNull) {
      throw new Error('The row with specified params not exists in the table. Params: ' + JSON.stringify(params))
    }

    return tableKey
      ? cy.get(`[data-cy-table="${tableKey}"]`).get(`tr:nth-child(${rowIndex + 1})`)
      : cy.root().get(`tbody tr:nth-child(${rowIndex + 1})`)
  })
})

/**
 * ---------------------------- Tabs ---------------------------------
 */

Cypress.Commands.add('findTabInTabGroupByIndex', (index) => {
  return cy.get('tab-group ul').find('li').eq(index).click()
})

/**
 * ---------------------------- CSV ---------------------------------
 */

// Cypress.Commands.add('readCSVFile', (filename) => {
//   return cy
//     .readFile(`cypress/downloads/${filename}`)
//     .then(neatCSV)
//     .then((data) => data)
// })

// Cypress.Commands.add('checkContentCsvFile', (filename, comparator) => {
//   return cy.readCSVFile(filename).then((result) => comparator(result))
// })

/**
 * ---------------------------- Images ---------------------------------
 */

Cypress.Commands.add('findImageInGridByPosition', (position) => {
  return cy
    .wait(WAIT_BEFORE_SEARCH_TIMEOUT)
    .get(`[data-index="${position - 1}"]`)
    .find('div')
    .find('img')
    .should('have.attr', 'src')
})
