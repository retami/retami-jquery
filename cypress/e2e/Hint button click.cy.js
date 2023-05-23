describe('Hint button click', () => {

    it('Clicking the hint button reveals one code hole at a time', () => {
        cy.visit('/');
        cy.get('.start-button').should('exist').click();

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