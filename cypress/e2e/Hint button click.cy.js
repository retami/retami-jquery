describe('Hint button click', () => {

    it('Hint button clicks show secret', () => {
        cy.visit('/');
        cy.get('.start-button').click();

        cy.get('[class="code-hole covered"]').should('have.length', 4);
        cy.get('.hint-button').click();
        cy.get('[class="code-hole covered"]').should('have.length', 3);
        cy.get('.hint-button').click();
        cy.get('[class="code-hole covered"]').should('have.length', 2);
        cy.get('.hint-button').click();
        cy.get('[class="code-hole covered"]').should('have.length', 1);
        cy.get('.hint-button').click();
        cy.get('[class="code-hole covered"]').should('have.length', 1);
        cy.get('.hint-button').click();
        cy.get('[class="code-hole covered"]').should('have.length', 1);
    });
});