describe('debug payment flow', () => {
  beforeEach(function () {
    cy.ObjectRepo()
    cy.visit('/support-us/your-donation')

    cy.get('@ORCommon').then((commonSelectors) => {
      cy.get(commonSelectors.PageBody).then(($body) => {
        if ($body.find(commonSelectors.AcceptCookiesButton).length > 0) {
          cy.get(commonSelectors.AcceptCookiesButton).click({ force: true })
        }
      })
    })
  })

  it('logs the next-page state', function () {

    cy.fixture('TestData/Testdata.json').then((testData) => {
      cy.get(this.ORDonationHomePage.Dollar10).check({ force: true })
      cy.contains(this.ORDonationHomePage.OwnMoneyLabel, 'I am donating my own money').click({ force: true })
      cy.get(this.ORDonationHomePage.DonationReasonSelect).select(testData.DonationReason1)
      cy.contains(this.ORDonationHomePage.ContinueButton, 'Continue').click({ force: true })

      cy.get(this.ORDonationDetailsPage.TitleSelect).first().select(testData.Title)
      cy.get(this.ORDonationDetailsPage.ForenameInput).clear().type(testData.firstname)
      cy.get(this.ORDonationDetailsPage.SurnameInput).clear().type(testData.lastname)
      cy.get(this.ORDonationDetailsPage.EmailInput).clear().type(testData.email)
      cy.get(this.ORDonationDetailsPage.PhoneInput).clear().type(testData.phone)

      cy.get(this.ORCommon.PageBody).then(($body) => {
        const postcodeInput = $body.find(this.ORDonationDetailsPage.PostcodeInput)
        if (postcodeInput.length) {
          cy.wrap(postcodeInput.first()).clear().type(testData.homeAddress.postcode)
          cy.contains(this.ORDonationDetailsPage.FindAddressButton, 'Find address').click({ force: true })
          cy.get(this.ORDonationDetailsPage.AddressSelection).should('be.visible').find(this.ORDonationDetailsPage.AddressSelectionOption).first().then(($option) => {
            cy.get(this.ORDonationDetailsPage.AddressSelection).select($option.val(), { force: true })
          })
        }
      })

      cy.get(this.ORCommon.PageBody).then(($body) => {
        const address1 = $body.find(this.ORDonationDetailsPage.Address1Input)
        if (address1.length) {
          cy.wrap(address1.first()).clear().type(testData.homeAddress.address1)
        }
      })

      cy.get(this.ORCommon.PageBody).then(($body) => {
        const town = $body.find(this.ORDonationDetailsPage.TownInput)
        if (town.length) {
          cy.wrap(town.first()).clear().type(testData.homeAddress.town)
        }
      })

      cy.get(this.ORCommon.PageBody).then(($body) => {
        const country = $body.find(this.ORDonationDetailsPage.CountryInput)
        if (country.length) {
          cy.wrap(country.first()).clear().type(testData.homeAddress.country)
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
})
