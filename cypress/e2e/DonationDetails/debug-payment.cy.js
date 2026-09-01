describe('debug payment flow', () => {
  beforeEach(function () {
    cy.ObjectRepo()
    cy.TestData()
    cy.DonationDetailsPageRepo()
    cy.PaymentPageRepo()
    cy.CommonElementsRepo()
    cy.visit('/support-us/your-donation')

    cy.get('@ORCommonElements').then((commonSelectors) => {
      cy.get(commonSelectors.PageBody).then(($body) => {
        if ($body.find(commonSelectors.AcceptCookiesButton).length > 0) {
          cy.get(commonSelectors.AcceptCookiesButton).click({ force: true })
        }
      })
    })
  })

  it('logs the next-page state', function () {
    cy.get(this.ORDonationHomePage.Dollar10).check({ force: true })
    cy.contains(this.ORDonationHomePage.OwnMoneyLabel, 'I am donating my own money').click({ force: true })
    cy.get(this.ORDonationHomePage.DonationReasonSelect).select(this.TestData.DonationReason1)
    cy.contains(this.ORDonationHomePage.ContinueButton, 'Continue').click({ force: true })

    cy.get(this.ORDonationDetailsPage.TitleSelect).first().select(this.TestData.Title)
    cy.get(this.ORDonationDetailsPage.ForenameInput).clear().type(this.TestData.firstname)
    cy.get(this.ORDonationDetailsPage.SurnameInput).clear().type(this.TestData.lastname)
    cy.get(this.ORDonationDetailsPage.EmailInput).clear().type(this.TestData.email)
    cy.get(this.ORDonationDetailsPage.PhoneInput).clear().type(this.TestData.phone)

    cy.get(this.ORCommonElements.PageBody).then(($body) => {
      const postcodeInput = $body.find(this.ORDonationDetailsPage.PostcodeInput)
      if (postcodeInput.length) {
        cy.wrap(postcodeInput.first()).clear().type(this.TestData.homeAddress.postcode)
        cy.contains(this.ORDonationDetailsPage.FindAddressButton, 'Find address').click({ force: true })
        cy.get(this.ORDonationDetailsPage.AddressSelection).should('be.visible').find(this.ORDonationDetailsPage.AddressSelectionOption).first().then(($option) => {
          cy.get(this.ORDonationDetailsPage.AddressSelection).select($option.val(), { force: true })
        })
      }
    })

    cy.get(this.ORCommonElements.PageBody).then(($body) => {
      const address1 = $body.find(this.ORDonationDetailsPage.Address1Input)
      if (address1.length) {
        cy.wrap(address1.first()).clear().type(this.TestData.homeAddress.address1)
      }
    })

    cy.get(this.ORCommonElements.PageBody).then(($body) => {
      const town = $body.find(this.ORDonationDetailsPage.TownInput)
      if (town.length) {
        cy.wrap(town.first()).clear().type(this.TestData.homeAddress.town)
      }
    })

    cy.get(this.ORCommonElements.PageBody).then(($body) => {
      const country = $body.find(this.ORDonationDetailsPage.CountryInput)
      if (country.length) {
        cy.wrap(country.first()).select(this.TestData.homeAddress.country)
      }
    })

    cy.get(this.ORDonationDetailsPage.SubmitButton).click({ force: true })
    cy.location('pathname').then((pathname) => {
      cy.log('pathname=' + pathname)
    })
    cy.get(this.ORDonationDetailsPage.Heading).then(($els) => {
      const texts = Array.from($els).map((el) => el.innerText.trim())
      cy.log(texts.join(' || '))
    })
  })
})
