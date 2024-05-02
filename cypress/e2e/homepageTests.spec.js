
describe ('HomepageTests', () => {

  it('homepage elements', () => {
    cy.visit('/')

    cy.get('header.bg-primary')
      .find('div')
      .children()
      .should('have.length', 2)

    cy.get('header.bg-primary')
      .find('p')
      .should('include.text','Items in Cart:')

    cy.get('header.bg-primary')
      .find('button')
      .should('include.text','To cart')

    cy.get('header.bg-primary')
      .find('button').click()
    cy.location('pathname').should('match', /\/cart$/);
    cy.go('back')

    cy.get('main.bg-secondary')
      .get('div.v-card').as('productCard')

    cy.get('@productCard')
      .eq(0).click()
    cy.location('pathname').should('match', /\/product\/1$/);
    cy.go('back')
    cy.get('@productCard')
      .eq(0)
      .find('img').should('have.attr','alt')
    cy.get('@productCard')
      .eq(0)
      .contains('h2','Brand:')
      .next('p').contains('Description:')
      .next('p').contains('Price:')

    cy.get('@productCard')
      .eq(3).click()
    cy.location('pathname').should('match', /\/product\/4$/);
    cy.go('back')
    cy.get('@productCard')
      .eq(3)
      .find('img').should('have.attr','alt')
    cy.get('@productCard')
      .eq(3)
      .contains('h2','Brand:')
      .next('p').contains('Description:')
      .next('p').contains('Price:')

    cy.get('@productCard')
      .eq(8).click()
    cy.location('pathname').should('match', /\/product\/9$/);
    cy.go('back')
    cy.get('@productCard')
      .eq(8)
      .find('img').should('have.attr','alt')
    cy.get('@productCard')
      .eq(8)
      .contains('h2','Brand:')
      .next('p').contains('Description:')
      .next('p').contains('Price:')


  })
})
