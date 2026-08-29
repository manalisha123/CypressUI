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
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
Cypress.Commands.add("ObjectRepo",function()
{ //qualcomm object repo
    cy.fixture('ObjectRepo/HomePage/OR_DonationHomePage.json').as("ORDonationHomePage")
    cy.fixture('ObjectRepo/DonationDetails/OR_DonationDetailsPage.json').as("ORDonationDetailsPage")
    cy.fixture('ObjectRepo/Common/OR_Common.json').as("ORCommon")
})
Cypress.Commands.add("TestData",function()
{ //qualcomm object repo
    cy.fixture('TestData/Testdata.json').as("TestData")
})
Cypress.Commands.add("DonorDetails",function()
{ //qualcomm object repo
    cy.fixture('TestData/Donor.json').as("DonorDetails")
})