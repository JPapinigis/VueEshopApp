
function chooseProduct(itemIndex) {

  cy.get('main.bg-secondary')
    .get('div.v-card').eq(Math.floor(Math.random() * 30)).as('product-' + itemIndex)
    .find('h2')
    .then(($h2) => {
      const brand = ($h2.text())
      cy.wrap(brand).as('brand')
    })

  cy.get('@product-' + itemIndex)
    .find('p').eq(1)
    .then(($p) => {
      const price = ($p.text())
      cy.wrap(price).as('price')
      const pattern = /[0-9]+/g
      const number = price.match(pattern)
      cy.wrap(number).as('itemPrice-' + itemIndex)
    })
}
function checkCartItemDetails(itemIndex) {

  cy.get('main.bg-secondary')
    .get('div.cart-items')
    .get('div.cart-item').eq(itemIndex).as('cart-item')

  cy.get('@cart-item')
    .find('img')
    .should('have.attr','alt')

  cy.get('@brand').then(brand => {
    cy.get('@cart-item')
      .find('[data-cy="brand"]')
      .should('have.text', brand)
  })

  cy.get('@cart-item')
    .find('[data-cy="category"]')
    .should('include.text', 'Category:')

  cy.get('@price').then(price => {
    cy.get('@cart-item')
      .find('[data-cy="price"]')
      .should('have.text', price)
  })
  cy.get('@cart-item')
    .find('button')
    .contains('Remove')
    .parent('button')
    .should('have.attr','type')

}
function checkTotalPrice() {
  cy.get('@currentTotal').then(number => {
    if (number > 1000) {
      cy.get('[data-cy="total-price"]')
        .should('have.text', 'Discounted total: ' + (number * 0.9).toFixed(2) + '€')
    } else {
      cy.get('[data-cy="total-price"]')
        .should('have.text', 'Total: ' + number + '€')
    }
  })
}
function removeFromCart(itemIndex) {

  let initialItemCount
  cy.get('main.bg-secondary')
    .get('div.cart-items')
    .find('div.cart-item')
    .its('length')
    .then((count) => {
      initialItemCount = count;
      cy.get('main.bg-secondary')
        .get('div.cart-items')
        .get('div.cart-item').eq(itemIndex)
        .find('button').click();
      cy.get('main.bg-secondary')
        .get('div.cart-items')
        .find('div.cart-item')
        .should('have.length', initialItemCount - 1);
    })
}

describe ('HomepageTests', () => {

  it('check product card', () => {
    let currentTotal = 0

    cy.visit('/')

    chooseProduct(1)

    cy.get('@product-1')
      .click()

    cy.get('main.bg-secondary')
      .get('div.bg-secondary')
      .get('div.v-card')
      .contains('Add to cart').click()

    cy.location('pathname').should('match', /\/cart$/);

    cy.get('header.bg-primary')
      .find('div')
      .children()
      .should('have.length', 1)

    cy.get('header.bg-primary')
      .find('p')
      .should('have.text', 'Items in Cart: 1')

    cy.get('main')
      .children()
      .should('have.length', 3)

    cy.get('main')
      .contains('Back to catalog')
      .should('have.attr', 'type')

    checkCartItemDetails(0)

    cy.get('@itemPrice-1').then(number => {
      currentTotal = currentTotal + Number(number)
      cy.wrap(currentTotal).as('currentTotal')
    })

    checkTotalPrice()

    cy.get('main')
      .contains('Back to catalog')
      .click()

    chooseProduct(2)

    cy.get('@product-2')
      .click()

    cy.get('main.bg-secondary')
      .get('div.bg-secondary')
      .get('div.v-card')
      .contains('Add to cart').click()

    cy.get('header.bg-primary')
      .find('p')
      .should('have.text', 'Items in Cart: 2')

    checkCartItemDetails(1)

    cy.get('@itemPrice-2').then(number => {
      currentTotal = currentTotal + Number(number)
      cy.wrap(currentTotal).as('currentTotal')
    })

    checkTotalPrice()

      cy.get('main')
        .contains('Back to catalog')
        .click()

    chooseProduct(3)

    cy.get('@product-3')
      .click()

    cy.get('main.bg-secondary')
      .get('div.bg-secondary')
      .get('div.v-card')
      .contains('Add to cart').click()

    cy.get('header.bg-primary')
      .find('p')
      .should('have.text', 'Items in Cart: 3')

    checkCartItemDetails(2)

    cy.get('@itemPrice-3').then(number => {
      currentTotal = currentTotal + Number(number)
      cy.wrap(currentTotal).as('currentTotal')
    })

    checkTotalPrice()

    removeFromCart(1)

    cy.get('header.bg-primary')
      .find('p')
      .should('have.text', 'Items in Cart: 2')

    removeFromCart(0)

    cy.get('header.bg-primary')
      .find('p')
      .should('have.text', 'Items in Cart: 1')

    removeFromCart(0)

    cy.get('header.bg-primary')
      .find('p')
      .should('have.text', 'Items in Cart: 0')

    cy.get('main')
      .children()
      .should('have.length', 2)

    cy.get('main')
      .contains('h1','Empty cart...')

    cy.get('main')
      .contains('[type="button"]','Back to catalog').click()

    cy.location('pathname').should('match', /\/$/);
    cy.get('header.bg-primary')
      .find('p')
      .should('have.text', 'Items in Cart: 0')
  })
})
