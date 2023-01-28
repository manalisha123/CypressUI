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
  
  //********************************************/
  //It function to launch URL 
  it('Launch Donation detail page in Cancer Reserach UK', function (){
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
    //**************************************************/
    //It function to select $10 and input details in donation page
    it('Select Donation Amount as $10 and navigate to detail page', function (){
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
 cy.get('form > :nth-child(3)').click()
      cy.get(this.ORDonationHomePage.TextForDedication).then(function(e){
        const t = e.text()
        expect(t).to.contains(this.TestData.TextForDedication)
          }) 
  })









  //Type the name of the person in memory
  it('Name of the person in memory',()=>{
    cy.wait(10)
    cy.get(this.ORDonationHomePage.NameOfThePerson)
      .type('Happy')
      .type('{enter}')
      .type('Soul') 
      .type('{enter}')
  })
  
  //******************************************************//
  //Next it function fill details in donation page and navigate to Payment page
  it('Details to be filled in donation page before Navigate to payment',()=>{
    cy.wait(100)
    cy.get('#onetrust-accept-btn-handler').click()
    cy.get('.sc-iwajpm').select('miss').should('have.value','miss')
    //Cypress.Cookies.debug(true, { verbose: false })
    cy.get('#forename')
      .type('Tester')
      .type('{enter}')
      Cypress.Cookies.debug(true, { verbose: false })
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
  
      //type postal code
      cy.get('#postalCode')
      .type('GU22 7SS')
      .type('{enter}')
  
       //search postal code
       cy.get(':nth-child(5) > .sc-dlnjwi').click()
  
       //Select Address
       cy.get('#addressSelection').select('37 The Rowans, Woking, GU22 7SS')
       cy.wait(100)
      //Confirmation of contact info provided
      cy.scrollTo('bottom')
      cy.get('.bWZpzy').click()
      //cy.get('.kffsok').dblclick({ force: true })
      cy.get('.kffsok').click() 
      cy.go(1) 
      cy.get('#onetrust-accept-btn-handler').click()
      cy.wait(1000)
      cy.get('.kffsok > .sc-gtsrHT').dblclick({ force: true })
  })
  
  
  //**************************/
  
  //It function to select payment method and complete donation
  it('Select payment Card method and confirm donation',()=>{
    cy.get('#onetrust-accept-btn-handler').click()
    cy.get(':nth-child(1) > .sc-dlMDgC > .sc-dIvrsQ > .sc-hHEiqL').click()
    cy.get('#cardholderName').type('Manalisha')
    .type('{enter}')
  
    cy.get('#braintree-hosted-field-number').type('4000000000001000')
    .type('{enter}')
  
    cy.get('#braintree-hosted-field-expirationDate').type('1225')
    .type('{enter}')
    cy.get('#braintree-hosted-field-cvv').type('123')
    .type('{enter}')
    cy.get('fieldset > .Checkbox__CheckboxContainer-sc-15tsvpd-0 > .Checkbox__StyledLabel-sc-15tsvpd-2').click()
    cy.get('.FormFields__FormFieldsStyled-sc-1bav6xx-0 > .Checkbox__CheckboxContainer-sc-15tsvpd-0 > .Checkbox__StyledLabel-sc-15tsvpd-2').click()
    cy.wait(1000)
    cy.get('.ekVtXN > .sc-dlnjwi').dblclick({ force: true })
  
  
  })
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  })
  