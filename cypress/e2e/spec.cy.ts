describe('template spec', () => {
  it('passes', () => {
    cy.visit('https://example.cypress.io')
  })
})

describe('Visit NextBnb', () => {
  it('Visit homepage', () => {
    cy.visit('http://localhost:3000')
  })
})
