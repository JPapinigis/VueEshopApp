
function productDetailCard() {
  cy.get('header.bg-primary')
    .find('p')
    .should('include.text','Items in Cart:')

  cy.get('header.bg-primary')
    .find('button')
    .should('include.text','To cart')

  cy.get('main.bg-secondary')
    .get('div.bg-secondary')
    .get('div.v-card').as('productDetails')

  cy.get('@productDetails')
    .find('div.product-image')
    .children('img')
    .should('have.attr','alt')

  cy.get('@brand').then(brand => {
    cy.get('@productDetails')
      .find('p').first()
      .should('have.text', brand)
  })
  cy.get('@description').then(description => {
    cy.get('@productDetails')
      .find('p').eq(1)
      .should('have.text', description)
  })
  cy.get('@price').then(price => {
    cy.get('@productDetails')
      .find('h2').first()
      .should('have.text', price)
  })
  cy.get('@productDetails')
    .contains('Add to cart')

  cy.get('@productDetails')
    .contains('Back to catalog').click()

  cy.location('pathname').should('match', /\/$/);

}

describe ('productDetailTests', () => {

  it('first product details', () => {
    cy.visit('/')

    cy.get('main.bg-secondary')
      .get('div.v-card').eq(0).as('firstProduct')
      .find('h2')
      .then(($h2) => {
        const brand = ($h2.text())
        cy.wrap(brand).as('brand')
      })
    cy.get('@firstProduct')
      .find('p').eq(0)
      .then(($p) => {
        const description = ($p.text())
        cy.wrap(description).as('description')
      })
    cy.get('@firstProduct')
      .find('p').eq(1)
      .then(($p) => {
        const price = ($p.text())
        cy.wrap(price).as('price')
      })

    cy.get('main.bg-secondary')
      .get('div.v-card')
      .eq(0)
      .click()

    productDetailCard()

  })
  it('third product details', () => {
    cy.visit('/')

    cy.get('main.bg-secondary')
      .get('div.v-card').eq(2).as('thirdProduct')
      .find('h2')
      .then(($h2) => {
        const brand = ($h2.text())
        cy.wrap(brand).as('brand')
      })
    cy.get('@thirdProduct')
      .find('p').eq(0)
      .then(($p) => {
        const description = ($p.text())
        cy.wrap(description).as('description')
      })
    cy.get('@thirdProduct')
      .find('p').eq(1)
      .then(($p) => {
        const price = ($p.text())
        cy.wrap(price).as('price')
      })

    cy.get('main.bg-secondary')
      .get('div.v-card')
      .eq(2)
      .click()

    productDetailCard()
  })
})
