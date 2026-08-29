const fillAddressIfPresent = (testData, commonSelectors, detailsSelectors) => {
  cy.get(commonSelectors.PageBody).then(($body) => {
    const manualAddressLink = $body.find(detailsSelectors.ManualAddressButton).filter((index, element) => /enter address manually/i.test(element.textContent || ''))
    if (manualAddressLink.length) {
      cy.wrap(manualAddressLink.first()).click({ force: true })
    }

    const postcodeInput = $body.find(detailsSelectors.PostcodeInput)
    if (postcodeInput.length) {
      cy.wrap(postcodeInput.first()).clear({ force: true }).type(testData.homeAddress.postcode, { force: true })
      cy.wrap(postcodeInput.first()).should('have.value', testData.homeAddress.postcode)
    }

    const address1 = $body.find(detailsSelectors.Address1Input)
    if (address1.length) {
      cy.wrap(address1.first()).clear({ force: true }).type(testData.homeAddress.address1, { force: true })
      cy.wrap(address1.first()).should('have.value', testData.homeAddress.address1)
    }

    const address2 = $body.find(detailsSelectors.Address2Input)
    if (address2.length) {
      cy.wrap(address2.first()).clear({ force: true }).type(testData.homeAddress.address2, { force: true })
    }

    const address3 = $body.find(detailsSelectors.Address3Input)
    if (address3.length) {
      cy.wrap(address3.first()).clear({ force: true }).type(testData.homeAddress.address3, { force: true })
    }

    const town = $body.find(detailsSelectors.TownInput)
    if (town.length) {
      cy.wrap(town.first()).clear({ force: true }).type(testData.homeAddress.town, { force: true })
    }

    const country = $body.find(detailsSelectors.CountryInput)
    if (country.length) {
      cy.wrap(country.first()).select(testData.homeAddress.country, { force: true })
    }

  })
}

describe('Donation journey', () => {
  beforeEach(function () {
    cy.ObjectRepo()
    cy.TestData()
    cy.visit('/support-us/your-donation')

    cy.get('@ORCommon').then((commonSelectors) => {
      cy.get(commonSelectors.PageBody).then(($body) => {
        if ($body.find(commonSelectors.AcceptCookiesButton).length > 0) {
          cy.get(commonSelectors.AcceptCookiesButton).click({ force: true })
        }
        const cookieContinueButton = $body.find(commonSelectors.CookieContinueButton).filter((index, element) => /OK, continue to site/i.test(element.textContent || ''))
        if (cookieContinueButton.length > 0) {
          cy.contains(commonSelectors.CookieContinueButton, /OK, continue to site/i).click({ force: true })
        }
      })
    })
  })

  it('launches the donation page with the expected content', function () {
    cy.contains(this.ORDonationHomePage.DonationAmountHeading, 'Donation amount').should('be.visible')
    cy.contains('Please choose an amount for your donation').should('be.visible')
    cy.contains(this.ORDonationHomePage.DonationAmountLabel, '£10').should('be.visible')
    cy.contains(this.ORDonationHomePage.ContinueButton, 'Continue').should('be.visible')
  })

  it('selects a donation amount and continues to the next step', function () {
    cy.get(this.ORDonationHomePage.Dollar10).check({ force: true })
    cy.contains(this.ORDonationHomePage.OwnMoneyLabel, 'I am donating my own money').click({ force: true })
    cy.get(this.ORDonationHomePage.DonationReasonSelect).select(this.TestData.DonationReason1, { force: true })
    cy.contains(this.ORDonationHomePage.ContinueButton, 'Continue').click({ force: true })

    cy.contains(this.ORDonationDetailsPage.YourDetailsHeading, 'Your details').should('be.visible')

    cy.get(this.ORDonationDetailsPage.TitleSelect).first().select(this.TestData.Title, { force: true })
    cy.get(this.ORDonationDetailsPage.ForenameInput).clear().type(this.TestData.firstname)
    cy.get(this.ORDonationDetailsPage.SurnameInput).clear().type(this.TestData.lastname)
    cy.get(this.ORDonationDetailsPage.EmailInput).clear().type(this.TestData.email)
    cy.get(this.ORDonationDetailsPage.PhoneInput).clear().type(this.TestData.phone)

    cy.contains(this.ORDonationDetailsPage.AddressHeading, /your address/i).should('be.visible')

    fillAddressIfPresent(this.TestData, this.ORCommon, this.ORDonationDetailsPage)

    cy.contains(this.ORDonationDetailsPage.ContinueButton, 'Continue').click({ force: true })
    cy.location('pathname', { timeout: 120000 }).should('match', /\/support-us\/details/)
    cy.contains(this.ORDonationDetailsPage.DetailsPageHeading, /details|your details/i, { timeout: 120000 }).should('be.visible')
  })

  it('continues to the payment page where card details are expected after completing personal details', function () {
    cy.get(this.ORDonationHomePage.Dollar10).check({ force: true })
    cy.contains(this.ORDonationHomePage.OwnMoneyLabel, 'I am donating my own money').click({ force: true })
    cy.get(this.ORDonationHomePage.DonationReasonSelect).select(this.TestData.DonationReason1, { force: true })
    cy.contains(this.ORDonationHomePage.ContinueButton, 'Continue').click({ force: true })

    cy.contains(this.ORDonationDetailsPage.YourDetailsHeading, 'Your details').should('be.visible')

    cy.get(this.ORDonationDetailsPage.TitleSelect).first().select(this.TestData.Title, { force: true })
    cy.get(this.ORDonationDetailsPage.ForenameInput).clear().type(this.TestData.firstname)
    cy.get(this.ORDonationDetailsPage.SurnameInput).clear().type(this.TestData.lastname)
    cy.get(this.ORDonationDetailsPage.EmailInput).clear().type(this.TestData.email)
    cy.get(this.ORDonationDetailsPage.PhoneInput).clear().type(this.TestData.phone)

    fillAddressIfPresent(this.TestData, this.ORCommon, this.ORDonationDetailsPage)

    cy.contains(this.ORDonationDetailsPage.ContinueButton, 'Continue').click({ force: true })
    cy.location('pathname', { timeout: 120000 }).should('match', /\/support-us\/details/)
    cy.contains(this.ORDonationDetailsPage.DetailsPageHeading, /details|your details/i, { timeout: 120000 }).should('be.visible')
  })
})
