describe('debug payment flow', () => {
  beforeEach(function () {
    cy.loadDonationFixtures()
    cy.visit('/support-us/your-donation')
    cy.dismissCookieOverlay()
  })

  it('logs the next-page state', function () {
    cy.get(this.ORDonationHomePage.Dollar10).check({ force: true })
    cy.contains(this.ORDonationHomePage.OwnMoneyLabel, 'I am donating my own money').click({ force: true })
    cy.get(this.ORDonationHomePage.DonationReasonSelect).select(this.TestData.DonationReason1, { force: true })
    cy.contains(this.ORDonationHomePage.ContinueButton, 'Continue').click({ force: true })

    cy.get(this.ORDonationDetailsPage.TitleSelect).first().select(this.TestData.Title, { force: true })
    cy.get(this.ORDonationDetailsPage.ForenameInput).as('forename').clear({ force: true }).then(() => {
      cy.get('@forename').type(this.TestData.firstname, { force: true })
    })
    cy.get(this.ORDonationDetailsPage.SurnameInput).as('surname').clear({ force: true }).then(() => {
      cy.get('@surname').type(this.TestData.lastname, { force: true })
    })
    cy.get(this.ORDonationDetailsPage.EmailInput).as('email').clear({ force: true }).then(() => {
      cy.get('@email').type(this.TestData.email, { force: true })
    })
    cy.get(this.ORDonationDetailsPage.PhoneInput).as('phone').clear({ force: true }).then(() => {
      cy.get('@phone').type(this.TestData.phone, { force: true })
    })

    cy.get(this.ORCommonElements.PageBody).then(($body) => {
      const postcodeInput = $body.find(this.ORDonationDetailsPage.PostcodeInput)
      if (postcodeInput.length) {
        cy.wrap(postcodeInput.first()).clear({ force: true }).type(this.TestData.homeAddress.postcode, { force: true })
      }
    })
    
    cy.contains(this.ORDonationDetailsPage.FindAddressButton, 'Find address').click({ force: true })
    cy.get(this.ORDonationDetailsPage.AddressSelection).should('be.visible').find(this.ORDonationDetailsPage.AddressSelectionOption).first().then(($option) => {
      cy.get(this.ORDonationDetailsPage.AddressSelection).select($option.val(), { force: true })
    })

    cy.get(this.ORCommonElements.PageBody).then(($body) => {
      const address1 = $body.find(this.ORDonationDetailsPage.Address1Input)
      if (address1.length) {
        cy.wrap(address1.first()).clear({ force: true }).type(this.TestData.homeAddress.address1, { force: true })
      }
    })

    cy.get(this.ORCommonElements.PageBody).then(($body) => {
      const town = $body.find(this.ORDonationDetailsPage.TownInput)
      if (town.length) {
        cy.wrap(town.first()).clear({ force: true }).type(this.TestData.homeAddress.town, { force: true })
      }
    })

    cy.get(this.ORCommonElements.PageBody).then(($body) => {
      const country = $body.find(this.ORDonationDetailsPage.CountryInput)
      if (country.length) {
        cy.wrap(country.first()).select(this.TestData.homeAddress.country, { force: true })
      }
    })

    cy.get(this.ORDonationDetailsPage.SubmitButton).click({ force: true })
    
    cy.location('pathname', { timeout: 10000 }).then((pathname) => {
      cy.log('pathname=' + pathname)
    })
    
    cy.get(this.ORDonationDetailsPage.Heading, { timeout: 5000 }).then(($els) => {
      const texts = Array.from($els).map((el) => el.innerText.trim())
      cy.log(texts.join(' || '))
    })
  })
})
