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
{ 
    cy.fixture('ObjectRepo/HomePage/OR_DonationHomePage.json').as("ORDonationHomePage")
})

/*Cypress.Commands.add("ObjectRepo",function()
{
    cy.fixture('ObjectRepo/HomePage/OR_ThankYouPage.json').as("ORThankYouHomePage")
})*/
Cypress.Commands.add("TestData",function()
{ 
    cy.fixture('TestData/Testdata.json').as("TestData")
})
Cypress.Commands.add("DonorDetails",function()
{ 
    cy.fixture('TestData/Donor.json').as("DonorDetails")
})
Cypress.Commands.add('getIFrameElement',(iFrameSelector,elementSelector)=> 
{
cy.get(iFrameSelector).then($element=>{
const $body=$element.contents().find('body');
let stripe=cy.wrap($body)
stripe.find(elementSelector).eq(0)
 })    
})
Cypress.Commands.add('getIframe', (iframe) => {
    return cy.get(iframe)
        .its('0.contentDocument.body')
        .should('be.visible')
        .then(cy.wrap);
})
Cypress.Commands.add('getWithinIframe', (targetElement) =>{
cy
.get('iframe')
.iframeLoaded()
.its('document')
.getInDocument(targetElement)
})
