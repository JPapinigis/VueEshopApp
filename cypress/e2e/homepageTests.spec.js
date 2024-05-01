/// <reference types="cypress"/>

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
      .find('img')
      .next('h2').should('include.text', 'Brand:')
      .next('p').should('include.text','Description:')
      .next('p').should('include.text', 'Price:')

    cy.get('@productCard')
      .eq(3).click()
    cy.location('pathname').should('match', /\/product\/4$/);
    cy.go('back')
    cy.get('@productCard')
      .eq(3)
      .find('img')
      .next('h2').should('include.text', 'Brand:')
      .next('p').should('include.text','Description:')
      .next('p').should('include.text', 'Price:')

    cy.get('@productCard')
      .eq(8).click()
    cy.location('pathname').should('match', /\/product\/9$/);
    cy.go('back')
    cy.get('@productCard')
      .eq(8)
      .find('img')
      .next('h2').should('include.text', 'Brand:')
      .next('p').should('include.text','Description:')
      .next('p').should('include.text', 'Price:')


  })
})
