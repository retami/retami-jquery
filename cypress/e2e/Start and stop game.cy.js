describe('Start and stop game', () => {

    it('Start game on click on start button and stop on quit button', () => {
        cy.visit('/');

        cy.get('.config-button').should('exist').should('be.visible').should('not.have.class', 'disabled');
        cy.get('.playing').should('exist').should('not.be.visible');
        cy.get('.quit-button').should('exist').should('not.be.visible');
        cy.get('.help-button').should('exist').should('be.visible').should('not.have.class', 'disabled');
        cy.get('.hint-button').should('exist').should('be.visible').should('have.class', 'disabled');
        cy.get('.start-button').should('exist').should('be.visible');
        cy.get('.check-button').should('not.be.visible');

        cy.get('.start-button').click();

        cy.get('.config-button').should('exist').should('be.visible').should('have.class', 'disabled');
        cy.get('.playing').should('exist').should('be.visible');
        cy.get('.quit-button').should('exist').should('be.visible').should('not.have.class', 'disabled');
        cy.get('.help-button').should('exist').should('be.visible').should('not.have.class', 'disabled');
        cy.get('.hint-button').should('exist').should('be.visible').should('not.have.class', 'disabled');
        cy.get('.start-button').should('not.be.visible');
        cy.get('.check-button').should('exist').should('be.visible').should('have.class', 'disabled');

        cy.get('.quit-button').click();

        cy.get('#quit-modal').should('exist').should('be.visible');

        cy.get('#quit-modal').click();

        cy.get('#quit-modal').should('not.be.visible');

        cy.get('.config-button').should('exist').should('be.visible').should('not.have.class', 'disabled');
        cy.get('.playing').should('exist').should('not.be.visible');
        cy.get('.quit-button').should('exist').should('not.be.visible');
        cy.get('.help-button').should('exist').should('be.visible').should('not.have.class', 'disabled');
        cy.get('.hint-button').should('exist').should('be.visible').should('have.class', 'disabled');
        cy.get('.start-button').should('exist').should('be.visible');
        cy.get('.check-button').should('not.be.visible');
    });
});