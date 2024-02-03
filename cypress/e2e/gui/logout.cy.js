describe('logout', function() {
    beforeEach(function() {
        cy.login()
        cy.visit('/')
    })

    it('successfully', function() {
        cy.logout()

        cy.url().should('be.equal', `${Cypress.config('baseUrl')}/users/sign_in`)

    })

})