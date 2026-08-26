describe('debug payment flow', () => {
  it('logs the next-page state', () => {
    cy.visit('/support-us/your-donation')

    cy.get('body').then(($body) => {
      if ($body.find('#onetrust-accept-btn-handler').length > 0) {
        cy.get('#onetrust-accept-btn-handler').click({ force: true })
      }
    })

    cy.fixture('TestData/Testdata.json').then((testData) => {
      cy.get('[data-cy="amount-sel-10"]').check({ force: true })
      cy.contains('label', 'I am donating my own money').click({ force: true })
      cy.get('select').select(testData.DonationReason1)
      cy.contains('button', 'Continue').click({ force: true })

      cy.get('select').first().select(testData.Title)
      cy.get('#forename').clear().type(testData.firstname)
      cy.get('#surname').clear().type(testData.lastname)
      cy.get('#emailAddress').clear().type(testData.email)
      cy.get('#phoneNumber').clear().type(testData.phone)

      cy.get('body').then(($body) => {
        const postcodeInput = $body.find('#postcode, input[name="postalCode"]')
        if (postcodeInput.length) {
          cy.wrap(postcodeInput.first()).clear().type(testData.homeAddress.postcode)
          cy.contains('Find address').click({ force: true })
          cy.get('#addressSelection').should('be.visible').find('option[value]:not([value=""])').first().then(($option) => {
            cy.get('#addressSelection').select($option.val(), { force: true })
          })
        }
      })

      cy.get('body').then(($body) => {
        const address1 = $body.find('#address1, input[name="address1"]')
        if (address1.length) {
          cy.wrap(address1.first()).clear().type(testData.homeAddress.address1)
        }
      })

      cy.get('body').then(($body) => {
        const town = $body.find('#town, input[name="town"]')
        if (town.length) {
          cy.wrap(town.first()).clear().type(testData.homeAddress.town)
        }
      })

      cy.get('body').then(($body) => {
        const country = $body.find('#country, input[name="country"]')
        if (country.length) {
          cy.wrap(country.first()).clear().type(testData.homeAddress.country)
        }
      })

      cy.get('button[type="submit"]').click({ force: true })
      cy.location('pathname').then((pathname) => {
        cy.log('pathname=' + pathname)
      })
      cy.get('h1, h2, h3').then(($els) => {
        const texts = Array.from($els).map((el) => el.innerText.trim())
        cy.log(texts.join(' || '))
      })
    })
  })
})
