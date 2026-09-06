// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

Cypress.Commands.add('ObjectRepo', function () {
  cy.fixture('ObjectRepo/HomePage/OR_DonationHomePage.json').as('ORDonationHomePage')
  cy.fixture('ObjectRepo/DonationDetails/OR_DonationDetailsPage.json').as('ORDonationDetailsPage')
  cy.fixture('ObjectRepo/Common/OR_Common.json').as('ORCommon')
})

Cypress.Commands.add('TestData', function () {
  cy.fixture('TestData/Testdata.json').as('TestData')
})

Cypress.Commands.add('DonorDetails', function () {
  cy.fixture('TestData/Donor.json').as('DonorDetails')
})

Cypress.Commands.add('DonationDetailsPageRepo', function () {
  cy.fixture('ObjectRepo/DonationDetails/OR_DonationDetailsPage.json').as('ORDonationDetailsPage')
})

Cypress.Commands.add('PaymentPageRepo', function () {
  cy.fixture('ObjectRepo/Payment/OR_PaymentPage.json').as('ORPaymentPage')
})

Cypress.Commands.add('CommonElementsRepo', function () {
  cy.fixture('ObjectRepo/Common/OR_Common.json').as('ORCommonElements')
})

Cypress.Commands.add('loadDonationFixtures', function () {
  cy.fixture('ObjectRepo/HomePage/OR_DonationHomePage.json').as('ORDonationHomePage')
  cy.fixture('ObjectRepo/DonationDetails/OR_DonationDetailsPage.json').as('ORDonationDetailsPage')
  cy.fixture('ObjectRepo/Common/OR_Common.json').as('ORCommon')
  cy.fixture('ObjectRepo/Common/OR_Common.json').as('ORCommonElements')
  cy.fixture('ObjectRepo/Payment/OR_PaymentPage.json').as('ORPaymentPage')
  cy.fixture('TestData/Testdata.json').as('TestData')
})

Cypress.Commands.add('dismissCookieOverlay', function () {
  cy.get('body').then(($body) => {
    const acceptButton = $body.find('#onetrust-accept-btn-handler')
    if (acceptButton.length) {
      cy.get('#onetrust-accept-btn-handler', { timeout: 5000 }).click({ force: true })
    }

    const continueButton = Array.from($body.find('button')).find((button) => /OK, continue to site/i.test(button.textContent || ''))
    if (continueButton) {
      cy.wrap(continueButton).click({ force: true })
    }
  })
})