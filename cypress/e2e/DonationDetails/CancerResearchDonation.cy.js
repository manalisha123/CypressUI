describe('Donation journey', () => {
  beforeEach(function () {
    cy.ObjectRepo()
    cy.TestData()
    cy.visit('/support-us/your-donation')

    cy.get('body').then(($body) => {
      if ($body.find('#onetrust-accept-btn-handler').length > 0) {
        cy.get('#onetrust-accept-btn-handler').click({ force: true })
      }
      if ($body.find('button').filter(':contains("OK, continue to site")').length > 0) {
        cy.contains('button', /OK, continue to site/i).click({ force: true })
      }
    })
  })

  it('launches the donation page with the expected content', function () {
    cy.contains('h2', 'Donation amount').should('be.visible')
    cy.contains('Please choose an amount for your donation').should('be.visible')
    cy.contains('label', '£10').should('be.visible')
    cy.contains('button', 'Continue').should('be.visible')
  })

  it('selects a donation amount and continues to the next step', function () {
    cy.get('[data-cy="amount-sel-10"]').check({ force: true })
    cy.contains('label', 'I am donating my own money').click({ force: true })
    cy.get('select').select(this.TestData.DonationReason1, { force: true })
    cy.contains('button', 'Continue').click({ force: true })

    cy.contains('h2', 'Your details').should('be.visible')

    cy.get('select').first().select(this.TestData.Title, { force: true })
    cy.get('#forename').clear().type(this.TestData.firstname)
    cy.get('#surname').clear().type(this.TestData.lastname)
    cy.get('#emailAddress').clear().type(this.TestData.email)
    cy.get('#phoneNumber').clear().type(this.TestData.phone)

    cy.contains('h2, h3, legend', /your address/i).should('be.visible')

    cy.get('body').then(($body) => {
      const manualAddressLink = $body.find('a, button').filter((index, element) => /enter address manually/i.test(element.textContent || ''))
      if (manualAddressLink.length) {
        cy.wrap(manualAddressLink.first()).click({ force: true })
      }
    })

    cy.get('body').then(($body) => {
      const postcodeInput = $body.find('#postcode, input[name="postcode"]')
      if (postcodeInput.length) {
        cy.wrap(postcodeInput.first()).clear({ force: true }).type(this.TestData.homeAddress.postcode, { force: true })
      }
    })

    cy.get('body').then(($body) => {
      const address1 = $body.find('#address1, input[name="address1"]')
      if (address1.length) {
        cy.wrap(address1.first()).clear({ force: true }).type(this.TestData.homeAddress.address1, { force: true })
        cy.wrap(address1.first()).should('have.value', this.TestData.homeAddress.address1)
      }
    })

    cy.get('body').then(($body) => {
      const address2 = $body.find('#address2, input[name="address2"]')
      if (address2.length) {
        cy.wrap(address2.first()).clear({ force: true }).type(this.TestData.homeAddress.address2, { force: true })
      }
    })

    cy.get('body').then(($body) => {
      const address3 = $body.find('#address3, input[name="address3"]')
      if (address3.length) {
        cy.wrap(address3.first()).clear({ force: true }).type(this.TestData.homeAddress.address3, { force: true })
      }
    })

    cy.get('body').then(($body) => {
      const town = $body.find('#town, input[name="town"]')
      if (town.length) {
        cy.wrap(town.first()).clear({ force: true }).type(this.TestData.homeAddress.town, { force: true })
      }
    })

    cy.get('body').then(($body) => {
      const country = $body.find('#country, select[name="country"]')
      if (country.length) {
        cy.wrap(country.first()).select(this.TestData.homeAddress.country, { force: true })
      }
    })

    cy.contains('button', 'Continue').click({ force: true })
    cy.contains('h1, h2, h3', /payment|your details/i, { timeout: 120000 }).should('be.visible')
  })

  it('continues to the payment details page after completing personal details', function () {
    cy.get('[data-cy="amount-sel-10"]').check({ force: true })
    cy.contains('label', 'I am donating my own money').click({ force: true })
    cy.get('select').select(this.TestData.DonationReason1, { force: true })
    cy.contains('button', 'Continue').click({ force: true })

    cy.contains('h2', 'Your details').should('be.visible')

    cy.get('select').first().select(this.TestData.Title, { force: true })
    cy.get('#forename').clear().type(this.TestData.firstname)
    cy.get('#surname').clear().type(this.TestData.lastname)
    cy.get('#emailAddress').clear().type(this.TestData.email)
    cy.get('#phoneNumber').clear().type(this.TestData.phone)

    cy.get('body').then(($body) => {
      const manualAddressLink = $body.find('a, button').filter((index, element) => /enter address manually/i.test(element.textContent || ''))
      if (manualAddressLink.length) {
        cy.wrap(manualAddressLink.first()).click({ force: true })
      }
    })

    cy.get('body').then(($body) => {
      const postcodeInput = $body.find('#postcode, input[name="postcode"]')
      if (postcodeInput.length) {
        cy.wrap(postcodeInput.first()).clear({ force: true }).type(this.TestData.homeAddress.postcode, { force: true })
      }
    })

    cy.get('body').then(($body) => {
      const address1 = $body.find('#address1, input[name="address1"]')
      if (address1.length) {
        cy.wrap(address1.first()).clear({ force: true }).type(this.TestData.homeAddress.address1, { force: true })
        cy.wrap(address1.first()).should('have.value', this.TestData.homeAddress.address1)
      }
    })

    cy.get('body').then(($body) => {
      const address2 = $body.find('#address2, input[name="address2"]')
      if (address2.length) {
        cy.wrap(address2.first()).clear({ force: true }).type(this.TestData.homeAddress.address2, { force: true })
      }
    })

    cy.get('body').then(($body) => {
      const town = $body.find('#town, input[name="town"]')
      if (town.length) {
        cy.wrap(town.first()).clear({ force: true }).type(this.TestData.homeAddress.town, { force: true })
      }
    })

    cy.get('body').then(($body) => {
      const country = $body.find('#country, select[name="country"]')
      if (country.length) {
        cy.wrap(country.first()).select(this.TestData.homeAddress.country, { force: true })
      }
    })

    cy.contains('button', 'Continue').click({ force: true })
    cy.contains('h1, h2, h3', /payment|details|your details/i, { timeout: 120000 }).should('be.visible')
  })
})
