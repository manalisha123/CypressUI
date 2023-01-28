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

//************************* */
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
  //*************************** */
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

})
//Type the name of the person in memory
it('Name of the person in memory',()=>{
  cy.get('#inMemoryName')
    .type('ABCD')
    .type('{enter}')
    .type( 'O\'Doh-erty') 
    .type('{enter}')
})

//*******************************************************************************************************/

//it function fill details in donation page and navigate to Payment page
it('Details to be filled in donation page before Navigate to payment',()=>{
  cy.wait(1000)
  //Handle cookies
  cy.get('#onetrust-accept-btn-handler').click()
  //Select Titile
  cy.get('.sc-cxabCf').select('miss').should('have.value','miss')
 //Enter Firstname
  cy.get('#forename')
    .type('Tester')
    .type('{enter}')
 //Enter last name
  cy.get('#surname')
    .type( 'O\'Doh-erty')
    .type('{enter}')
  //Enter Mail address
    cy.get('#emailAddress')
    .type('auto-pws@cancer.org.uk')
    .type('{enter}')
  //Enter Phone number
    cy.get('#phoneNumber')
    .type('07999999999')
    .type('{enter}')
  //type postal code
    cy.get('#postalCode')
    .type('GU22 7SS')
    .type('{enter}')
  //search postal code and select address from the drop down list
    cy.get(':nth-child(5) > .sc-hKMtZM > .sc-dkzDqf').click()
    cy.get('#addressSelection').select('37 The Rowans, Woking, GU22 7SS')
    cy.wait(100)
    //Confirmation of contact info provided
    cy.scrollTo('bottom')
    cy.get('.bWZpzy').click()
    cy.get('.iEeNAa').click() 
 
  
    cy.wait(1000)
    cy.get('.iEeNAa > .sc-dkzDqf').dblclick({ force: true})
    cy.go(1) 
})
//****************************************************************************************//
//It function to select payment method and complete donation
it('Select payment Card method and confirm donation',()=>{
//Handle cookies
  cy.get('#onetrust-accept-btn-handler').click()

//Note : Selected google pay but the submit button keeps loading not able to navigate to next thank you page
 // cy.get(':nth-child(3) > .sc-dlMDgC > .sc-fKgJPI').click({ force: true})
cy.wait(1000)
//Note: Select Visa as payment method but can't proceed to thank you page
cy.get(':nth-child(1) > .sc-kgflAQ > .sc-hHLeRK > .sc-dmRaPn').click({ force: true})
//Assert credit/Debit card is selected
cy.get('.PaymentToggle__CardPayment-sc-1lx54at-2 > .FormGroup__FormGroupStyled-sc-tf6z59-0 > .FormFields__FormFieldsStyled-sc-1bav6xx-0 > fieldset > legend > .sc-breuTD').then(function(e){
const t = e.text()
expect(t).to.contains(this.TestData.CreditCardHeader)
}) 
cy.wait(1000)
//Enter Card holder name and assertion
cy.get('#cardholderName').type('Manalisha').should('have.value','Manalisha')
//Enter Card number Details in next input box
cy.wait(3000)
cy.get('.PaymentToggle__CardPayment-sc-1lx54at-2 > .FormGroup__FormGroupStyled-sc-tf6z59-0 > .FormFields__FormFieldsStyled-sc-1bav6xx-0 > fieldset').click()
cy.wait(1000)


var fContrl = document.getElementsByClassName('selector-input');
{for (var i = 0; i < fContrl.length; i++)
    fContrl[i].disabled=false;
  
  }



cy.get('#card-number').should('be.visible').click({force: true})

cy.getIFrameElement('[for=\"credit-card-number\"]','#card-number').type('4000000000001000')
cy.wait(1000)
cy.getIframe('#braintree-hosted-field-expirationDate','#card-expiration-date').click().type('12/2025')
cy.wait(1000)
cy.get('#card-cvv').type('123')


//Click on check box
cy.get('fieldset > .Checkbox__CheckboxContainer-sc-15tsvpd-0 > .Checkbox__StyledLabel-sc-15tsvpd-2').click()
cy.wait(1000)
//type postal code
cy.get('#billingPostalCode')
.type('GU22 7SS')
.type('{enter}')
//search postal code and select address from the drop down list
cy.get('.hHgOSe > .sc-dlnjwi').click()
cy.get('#billingAddressSelection').select('38 The Rowans, Woking, GU22 7SS')
//Click on check box of 25%
cy.get('.FormFields__FormFieldsStyled-sc-1bav6xx-0 > .Checkbox__CheckboxContainer-sc-15tsvpd-0 > .Checkbox__StyledLabel-sc-15tsvpd-2').click()
cy.wait(1000)
//Confirming Donation
cy.get('.ekVtXN > .sc-dlnjwi').click({ force: true })


})
























})

