const fillAddressIfPresent = (testData, detailsSelectors) => {
  cy.get('body', { timeout: 5000 }).then(($body) => {
    const manualAddressLink = $body.find(detailsSelectors.ManualAddressButton).filter((index, element) => /enter address manually/i.test(element.textContent || ''))
    if (manualAddressLink.length) {
      cy.wrap(manualAddressLink.first()).click({ force: true })
      cy.wait(300)
    }
  })

  // Try to fill postcode if it exists
  cy.get('body').then(($body) => {
    const postcodeEl = $body.find(detailsSelectors.PostcodeInput)
    if (postcodeEl.length) {
      cy.wrap(postcodeEl.first()).clear({ force: true }).type(testData.homeAddress.postcode, { force: true }).should('have.value', testData.homeAddress.postcode)
    }
  })

  // Try to fill address1 if it exists
  cy.get('body').then(($body) => {
    const addr1El = $body.find(detailsSelectors.Address1Input)
    if (addr1El.length) {
      cy.wrap(addr1El.first()).clear({ force: true }).type(testData.homeAddress.address1, { force: true }).should('have.value', testData.homeAddress.address1)
    }
  })

  // Try to fill address2 if it exists
  cy.get('body').then(($body) => {
    const addr2El = $body.find(detailsSelectors.Address2Input)
    if (addr2El.length) {
      cy.wrap(addr2El.first()).clear({ force: true }).type(testData.homeAddress.address2, { force: true })
    }
  })

  // Try to fill address3 if it exists
  cy.get('body').then(($body) => {
    const addr3El = $body.find(detailsSelectors.Address3Input)
    if (addr3El.length) {
      cy.wrap(addr3El.first()).clear({ force: true }).type(testData.homeAddress.address3, { force: true })
    }
  })

  // Try to fill town if it exists
  cy.get('body').then(($body) => {
    const townEl = $body.find(detailsSelectors.TownInput)
    if (townEl.length) {
      cy.wrap(townEl.first()).clear({ force: true }).type(testData.homeAddress.town, { force: true })
    }
  })

  // Try to fill country if it exists
  cy.get('body').then(($body) => {
    const countryEl = $body.find(detailsSelectors.CountryInput)
    if (countryEl.length) {
      cy.wrap(countryEl.first()).select(testData.homeAddress.country, { force: true })
    }
  })
}

const startDonationJourney = (testData, homePage) => {
  cy.get(homePage.Dollar10).check({ force: true })
  cy.contains(homePage.OwnMoneyLabel, 'I am donating my own money').click({ force: true })
  cy.get(homePage.DonationReasonSelect).select(testData.DonationReason1, { force: true })
  cy.contains(homePage.ContinueButton, 'Continue').click({ force: true })
}

const completeDonationDetails = (testData, detailsPage) => {
  cy.contains(detailsPage.YourDetailsHeading, 'Your details').should('be.visible')

  cy.get(detailsPage.TitleSelect).first().select(testData.Title, { force: true })
  cy.get(detailsPage.ForenameInput).as('forename').clear({ force: true }).then(() => {
    cy.get('@forename').type(testData.firstname, { force: true })
  })
  cy.get(detailsPage.SurnameInput).as('surname').clear({ force: true }).then(() => {
    cy.get('@surname').type(testData.lastname, { force: true })
  })
  cy.get(detailsPage.EmailInput).as('email').clear({ force: true }).then(() => {
    cy.get('@email').type(testData.email, { force: true })
  })
  cy.get(detailsPage.PhoneInput).as('phone').clear({ force: true }).then(() => {
    cy.get('@phone').type(testData.phone, { force: true })
  })

  cy.contains(detailsPage.AddressHeading, /your address/i).should('be.visible')
  fillAddressIfPresent(testData, detailsPage)

  cy.contains(detailsPage.ContinueButton, 'Continue').click({ force: true })
}

describe('Donation journey', () => {
  beforeEach(function () {
    cy.loadDonationFixtures()
    cy.visit('/support-us/your-donation')
    cy.dismissCookieOverlay()
  })

  it('launches the donation page with the expected content', function () {
    cy.contains(this.ORDonationHomePage.DonationAmountHeading, 'Donation amount').should('be.visible')
    cy.contains('Please choose an amount for your donation').should('be.visible')
    cy.contains(this.ORDonationHomePage.DonationAmountLabel, '£10').should('be.visible')
    cy.contains(this.ORDonationHomePage.ContinueButton, 'Continue').should('be.visible')
  })

  it('selects a donation amount and continues to the next step', function () {
    startDonationJourney(this.TestData, this.ORDonationHomePage)
    completeDonationDetails(this.TestData, this.ORDonationDetailsPage)

    cy.location('pathname', { timeout: 120000 }).should('match', /\/support-us\/details/)
    cy.contains(this.ORDonationDetailsPage.DetailsPageHeading, /details|your details/i, { timeout: 120000 }).should('be.visible')
  })

  it('continues to the payment page where card details are expected after completing personal details', function () {
    startDonationJourney(this.TestData, this.ORDonationHomePage)
    completeDonationDetails(this.TestData, this.ORDonationDetailsPage)

    cy.location('pathname', { timeout: 120000 }).should('match', /\/support-us\/details/)
    cy.contains(this.ORDonationDetailsPage.DetailsPageHeading, /details|your details/i, { timeout: 120000 }).should('be.visible')
  })
})
