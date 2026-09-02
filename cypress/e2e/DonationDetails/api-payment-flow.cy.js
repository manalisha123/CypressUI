describe('API Payment Flow', () => {
  let testData
  let donationId
  let transactionId

  before(function () {
    cy.fixture('TestData/Testdata.json').then((data) => {
      testData = data
    })
  })

  it('should create a donation via API', function () {
    const donationPayload = {
      amount: 1000, // £10 in pence
      donationType: 'personal',
      donationReason: testData.DonationReason1,
      giftAid: testData.giftaid === 'yes'
    }

    cy.request({
      method: 'POST',
      url: '/api/donations',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: donationPayload,
      failOnStatusCode: false
    }).then((response) => {
      cy.log('Donation Creation Response:', JSON.stringify(response.body))
      expect(response.status).to.be.oneOf([200, 201])
      expect(response.body).to.have.property('id')
      donationId = response.body.id
    })
  })

  it('should submit personal details via API', function () {
    const personalDetailsPayload = {
      title: testData.Title,
      firstName: testData.firstname,
      lastName: testData.lastname,
      email: testData.email,
      phoneNumber: testData.phone,
      giftAidOptIn: testData.giftaid === 'yes',
      emailOptIn: testData.emailOptIn === 'yes'
    }

    cy.request({
      method: 'PUT',
      url: `/api/donations/${donationId}/details`,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: personalDetailsPayload,
      failOnStatusCode: false
    }).then((response) => {
      cy.log('Personal Details Response:', JSON.stringify(response.body))
      expect(response.status).to.be.oneOf([200, 204])
    })
  })

  it('should submit address details via API', function () {
    const addressPayload = {
      address1: testData.homeAddress.address1,
      address2: testData.homeAddress.address2,
      address3: testData.homeAddress.address3,
      town: testData.homeAddress.town,
      postcode: testData.homeAddress.postcode,
      country: testData.homeAddress.country
    }

    cy.request({
      method: 'PUT',
      url: `/api/donations/${donationId}/address`,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: addressPayload,
      failOnStatusCode: false
    }).then((response) => {
      cy.log('Address Details Response:', JSON.stringify(response.body))
      expect(response.status).to.be.oneOf([200, 204])
    })
  })

  it('should process payment via API', function () {
    const paymentPayload = {
      cardNumber: testData.cardNumber,
      expiryDate: testData.cardExpiry,
      cvv: testData.cvv,
      cardholderName: `${testData.firstname} ${testData.lastname}`
    }

    cy.request({
      method: 'POST',
      url: `/api/donations/${donationId}/payment`,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: paymentPayload,
      failOnStatusCode: false
    }).then((response) => {
      cy.log('Payment Response:', JSON.stringify(response.body))
      expect(response.status).to.be.oneOf([200, 201])
      expect(response.body).to.have.property('transactionId')
      expect(response.body).to.have.property('status')
      transactionId = response.body.transactionId
    })
  })

  it('should confirm donation completion via API', function () {
    cy.request({
      method: 'GET',
      url: `/api/donations/${donationId}`,
      headers: {
        'Accept': 'application/json'
      },
      failOnStatusCode: false
    }).then((response) => {
      cy.log('Donation Status Response:', JSON.stringify(response.body))
      expect(response.status).to.equal(200)
      expect(response.body).to.have.property('id', donationId)
      expect(response.body).to.have.property('status')
      expect(response.body.status).to.be.oneOf(['completed', 'successful', 'processed'])
      expect(response.body).to.have.property('amount', 1000)
    })
  })

  it('should verify transaction details via API', function () {
    cy.request({
      method: 'GET',
      url: `/api/transactions/${transactionId}`,
      headers: {
        'Accept': 'application/json'
      },
      failOnStatusCode: false
    }).then((response) => {
      cy.log('Transaction Details Response:', JSON.stringify(response.body))
      expect(response.status).to.equal(200)
      expect(response.body).to.have.property('id', transactionId)
      expect(response.body).to.have.property('donationId', donationId)
      expect(response.body).to.have.property('status')
      expect(response.body).to.have.property('amount', 1000)
    })
  })

  it('should retrieve donation confirmation details via API', function () {
    cy.request({
      method: 'GET',
      url: `/api/donations/${donationId}/confirmation`,
      headers: {
        'Accept': 'application/json'
      },
      failOnStatusCode: false
    }).then((response) => {
      cy.log('Confirmation Response:', JSON.stringify(response.body))
      expect(response.status).to.equal(200)
      expect(response.body).to.have.property('donationId', donationId)
      expect(response.body).to.have.property('amount', 1000)
      expect(response.body).to.have.property('donorEmail', testData.email)
      expect(response.body).to.have.property('transactionId', transactionId)
    })
  })

  it('should validate API error handling for invalid payment', function () {
    const invalidPaymentPayload = {
      cardNumber: '0000000000000000', // Invalid test card
      expiryDate: '1225',
      cvv: '123',
      cardholderName: `${testData.firstname} ${testData.lastname}`
    }

    cy.request({
      method: 'POST',
      url: `/api/donations/${donationId}/payment`,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: invalidPaymentPayload,
      failOnStatusCode: false
    }).then((response) => {
      cy.log('Invalid Payment Response:', JSON.stringify(response.body))
      // Should fail with 4xx status
      expect(response.status).to.be.greaterThanOrEqual(400)
      expect(response.status).to.be.lessThan(500)
      expect(response.body).to.have.property('error')
    })
  })

  it('should validate missing required fields for donation', function () {
    const incompletePayload = {
      amount: 1000
      // Missing donationType and donationReason
    }

    cy.request({
      method: 'POST',
      url: '/api/donations',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: incompletePayload,
      failOnStatusCode: false
    }).then((response) => {
      cy.log('Incomplete Donation Response:', JSON.stringify(response.body))
      expect(response.status).to.be.greaterThanOrEqual(400)
      expect(response.body).to.have.property('error')
    })
  })

  it('should validate email format in personal details', function () {
    const invalidEmailPayload = {
      title: testData.Title,
      firstName: testData.firstname,
      lastName: testData.lastname,
      email: 'invalid-email-format', // Invalid email
      phoneNumber: testData.phone,
      giftAidOptIn: testData.giftaid === 'yes'
    }

    cy.request({
      method: 'PUT',
      url: `/api/donations/${donationId}/details`,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: invalidEmailPayload,
      failOnStatusCode: false
    }).then((response) => {
      cy.log('Invalid Email Response:', JSON.stringify(response.body))
      expect(response.status).to.be.greaterThanOrEqual(400)
      expect(response.body).to.have.property('error')
    })
  })

  it('should validate donation amount constraints', function () {
    const invalidAmountPayload = {
      amount: 0, // Invalid - must be greater than 0
      donationType: 'personal',
      donationReason: testData.DonationReason1,
      giftAid: testData.giftaid === 'yes'
    }

    cy.request({
      method: 'POST',
      url: '/api/donations',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: invalidAmountPayload,
      failOnStatusCode: false
    }).then((response) => {
      cy.log('Invalid Amount Response:', JSON.stringify(response.body))
      expect(response.status).to.be.greaterThanOrEqual(400)
      expect(response.body).to.have.property('error')
    })
  })

  it('should validate postcode format in address details', function () {
    const invalidAddressPayload = {
      address1: testData.homeAddress.address1,
      address2: testData.homeAddress.address2,
      town: testData.homeAddress.town,
      postcode: 'INVALID', // Invalid postcode format
      country: testData.homeAddress.country
    }

    cy.request({
      method: 'PUT',
      url: `/api/donations/${donationId}/address`,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: invalidAddressPayload,
      failOnStatusCode: false
    }).then((response) => {
      cy.log('Invalid Postcode Response:', JSON.stringify(response.body))
      expect(response.status).to.be.greaterThanOrEqual(400)
      expect(response.body).to.have.property('error')
    })
  })

  it('should handle concurrent API requests gracefully', function () {
    const requests = [
      cy.request({
        method: 'GET',
        url: `/api/donations/${donationId}`,
        failOnStatusCode: false
      }),
      cy.request({
        method: 'GET',
        url: `/api/transactions/${transactionId}`,
        failOnStatusCode: false
      })
    ]

    cy.wrap(requests).each((request) => {
      expect(request.status).to.equal(200)
    })
  })

  it('should verify response time performance', function () {
    cy.request({
      method: 'GET',
      url: `/api/donations/${donationId}`,
      failOnStatusCode: false
    }).then((response) => {
      cy.log('Response Duration:', response.duration, 'ms')
      expect(response.status).to.equal(200)
      // Verify response completes within acceptable time (e.g., 5 seconds)
      expect(response.duration).to.be.lessThan(5000)
    })
  })
})
