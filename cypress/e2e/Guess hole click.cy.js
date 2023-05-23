describe('Guess holes click', () => {

    it('opens the color dialog and lets select a color', () => {
        cy.viewport(550, 1000);

        cy.visit('/');
        cy.get('.start-button').click();

        let colors;
        cy.window().then((win) => {
            colors = win.app.game.colors;
        }).then(() => {
            for (let hole = 0; hole < 4; hole++) {
                for (let color = 0; color < 5; color++) {
                    cy.get('.current').find('.guess-holes').find('.guess-hole').eq(hole).click();
                    cy.get(`.color-${color + 1}`).should('be.visible');
                    cy.get(`.color-${color + 1}`).forceClick();
                    cy.get(`.color-${color + 1}`).should('not.be.visible');
                    cy.get('.current').find('.guess-holes').find('.guess-hole').eq(hole).should("have.css", "background-color", colors[color]);
                }
            }
        });
    });
});