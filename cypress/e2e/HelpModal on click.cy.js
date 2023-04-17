describe('Show help modal', () => {
    it('Show modal on help button click', () => {
        cy.visit('/');
        cy.get('.help-button').click();
        cy.get('#help-modal').should('exist').should('be.visible').should('contain', 'and');
        cy.get('.modal-button').click();
        cy.get('#help-modal').should('not.be.visible');
    });
});