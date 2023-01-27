describe('Navigate and verifies the Donation  page',function(){
let Company_Name
before(function()     
{
cy.ObjectRepo()
cy.TestData()
var TimeStamp=new Date();
TimeStamp=TimeStamp.getTime();
Company_Name="CancerResearch"  
})
beforeEach(function(){
cy.ObjectRepo()
cy.TestData()
})
it('Launch Donation detail page', function (){
    // test step for URL launching
    cy.visit("https://app.pws.int.cruk.org/support-us/your-donation");
   // enable cookie logging
    cy.get(this.ORDonationHomePage.AcceptCookiesWindowPopUp).then(function(e){
  
       const t = e.text()
       expect(t).to.contains(this.TestData.AcceptCookiesWindowPopUpContentasOK)
    })
    cy.wait(1000)
    //Accept all cookies and proceed to website
    cy.get(this.ORDonationHomePage.AcceptCookiesButton).click({ force: true })
    //Assert your donation page hedaer message
    cy.get(this.ORDonationHomePage.DonationBanner).then(function(e){
    const t = e.text()
    expect(t).to.contains(this.TestData.DonationPageBannerContent)
    })
  })
  it('Select Donation Amount as $10', function (){
    //Select $10 for donnation and verify the input box
    cy.get(this.ORDonationHomePage.Dollar10).click()
     //Assert your donation type 
    cy.get(this.ORDonationHomePage.DonationType).then(function(e){
    const t = e.text()
    expect(t).to.contains(this.TestData.DonationType)
    })
    //Assert your donation type as personal
    cy.get(this.ORDonationHomePage.DonationTypeRequiredPersonal).then(function(e){
    const t = e.text()
    expect(t).to.contains(this.TestData.PersonalDonationReason)
    })

     cy.get(this.ORDonationHomePage.DonationGiftAidText).then(function(e){
      const t = e.text()
      expect(t).to.contains(this.TestData.GiftAidClaimText)
      })

//Select donation type as personal money
  cy.get(this.ORDonationHomePage.SelectRadioButtonasPersonalMoney).click()
  
//What motivates you
  cy.get(this.ORDonationHomePage.YourMotivation).then(function(e){
    const t = e.text()
    expect(t).to.contains(this.TestData.YourMotivationText)
    }) 
//Confirmation of donation type money as pesronal
    cy.get(this.ORDonationHomePage.DonationConfirmationQuestion).then(function(e){
      const t = e.text()
      expect(t).to.contains(this.TestData.DonationConfirmationQuestion)
      }) 
//Select Options for why donation
cy.get('select').select(this.TestData.DonationReason1).should('have.value', this.TestData.DonationReason1)
//Verify reason why the above question
cy.get(this.ORDonationHomePage.DonationQuestionReason).click()
cy.get(this.ORDonationHomePage.DonationQuestionReasonAnswer).then(function(e){
  const t = e.text()
  expect(t).to.contains(this.TestData.WhyDonationDetailText)
  }) 
})
//Type the name of the person in memory
it('Name of the person in memory',()=>{
  cy.get('#inMemoryName')
    .type('ABCD')
    .type('{enter}')
    .type( 'O\'Doh-erty')
    .type('{enter}')
})
//Fill details in donation page
it('Details in donation page',()=>{
  cy.wait(1000)
  // assertion
  cy.contains('Donation').should('be.visible')
  //cy.wait(1000)
  cy.get('div:nth-child(1) > div > fieldset:nth-child(1) > div.sc-fFSPTT.lilusD > div > label > select').select('miss').should('have.value','miss')


  cy.get('#forename')
    .type('Tester')
    .type('{enter}')

  cy.get('#surname')
    .type( 'O\'Doh-erty')
    .type('{enter}')
    //cy.wait(100)
    cy.get('#emailAddress')
    .type('auto-pws@cancer.org.uk')
    .type('{enter}')

    cy.get('#phoneNumber')
    .type('07999999999')
    .type('{enter}')
})
})
