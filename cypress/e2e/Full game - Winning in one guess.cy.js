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
            let code = Array.from(secret.code, el => colors.findIndex((element) => element === el));

            setGuess(colors, [ other(code, 5), other(code, 5), other(code, 5), other(code, 5)]);
            assertFeedback(0, ['none', 'none', 'none', 'none']);
            setGuess(colors, [ code[0], other(code, 5), other(code, 5), other(code, 5)]);
            assertFeedback(1, ['black', 'none', 'none', 'none']);
            setGuess(colors, [ code[0], code[1], other(code, 5), other(code, 5)]);
            assertFeedback(2, ['black', 'black', 'none', 'none']);
            setGuess(colors, [ code[0], code[1], code[2], other(code, 5)]);
            assertFeedback(3, ['black', 'black', 'black', 'none']);
            setGuess(colors, code);
            assertFeedback(4, ['black', 'black', 'black', 'black']);
            cy.get('#win-modal').should('be.visible').click().should('not.be.visible');
        });

        function other(set, length) {
            let candidates = Array.from(new Array(length).keys()).filter(val => ! set.includes(val));
            return candidates[Math.floor(Math.random()*candidates.length)];
        }

        function setGuess(colors, guess) {
            for (let hole = 0; hole < guess.length; hole++) {
                cy.log(guess[hole].toString());
                cy.get('.current').find('.guess-holes').find('.guess-hole').eq(hole).click();
                cy.get(`.color-${guess[hole] + 1}`).should('be.visible');
                cy.get(`.color-${guess[hole] + 1}`).forceClick();
                cy.get(`.color-${guess[hole] + 1}`).should('not.be.visible');
                cy.get('.current').find('.guess-holes').find('.guess-hole').eq(hole).should("have.css", "background-color", colors[guess[hole]]);
                cy.get('.check-button').click();
            }
        }
    });

    function assertFeedback(row, pins) {
        for(let i= 0; i < pins.length; i++){
            if(pins[i] === 'black') {
                cy.get('.feedback-hole').eq(row*pins.length + i).should('have.class', 'black-feedback');
            }
            if(pins[i] === 'white') {
                cy.get('.feedback-hole').eq(row*pins.length + i).should('have.class', 'white-feedback');
            }
            if(pins[i] === 'none') {
                cy.get('.feedback-hole').eq(row*pins.length + i).should('not.have.class', 'black-feedback');
                cy.get('.feedback-hole').eq(row*pins.length + i).should('not.have.class', 'white-feedback');
            }
        }
    }
});