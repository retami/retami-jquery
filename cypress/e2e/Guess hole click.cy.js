describe('Guess holes click', () => {

    const colors = [
        'rgb(244, 67, 54)',
        'rgb(233, 30, 99)',
        'rgb(156, 39, 176)',
        'rgb(76, 175, 80)',
        'rgb(255, 235, 59)',
        'rgb(121, 85, 72)',
        'rgb(33, 150, 243)',
    ];

    it('opens the color dialog and lets select a color', () => {
        cy.viewport(550, 1000);
        cy.visit('/');
        cy.get('.start-button').click();

        for (let hole = 0; hole < 4; hole++) {
            for(let color = 0; color < 5; color++) {
                cy.get('.current').find('.guess-holes').find('.guess-hole').eq(hole).click();
                cy.get(`.color-${color + 1}`).should('be.visible');
                cy.get(`.color-${color + 1}`).forceClick();
                cy.get(`.color-${color + 1}`).should('not.be.visible');
                cy.get('.current').find('.guess-holes').find('.guess-hole').eq(hole).should("have.css", "background-color", colors[color]);
            }
        }
    });
});