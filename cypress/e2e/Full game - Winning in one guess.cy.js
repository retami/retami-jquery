describe('Full game - Winning in one guess', () => {

    it('win with one guess', () => {
        cy.viewport(550, 1000);
        cy.visit('/');
        cy.get('.start-button').click();

        let colors;
        let secret;
        cy.window().then((win) => {
            secret = win.app.secret;
            colors = win.app.game.colors;
        }).then(() => {
            for (let hole = 0; hole < 4; hole++) {
                const key = colors.findIndex((element) => element === secret.code[hole]);
                cy.log(key.toString());
                cy.get('.current').find('.guess-holes').find('.guess-hole').eq(hole).click();
                cy.get(`.color-${key + 1}`).should('be.visible');
                cy.get(`.color-${key + 1}`).forceClick();
                cy.get(`.color-${key + 1}`).should('not.be.visible');
                cy.get('.current').find('.guess-holes').find('.guess-hole').eq(hole).should("have.css", "background-color", colors[key]);
            }
        });

        cy.get('.check-button').click();

        cy.get('.feedback-hole').eq(0).should('have.class', 'black-feedback');
        cy.get('.feedback-hole').eq(1).should('have.class', 'black-feedback');
        cy.get('.feedback-hole').eq(2).should('have.class', 'black-feedback');
        cy.get('.feedback-hole').eq(3).should('have.class', 'black-feedback');

        cy.get('#win-modal').should('be.visible').click().should('not.be.visible');
    });
});