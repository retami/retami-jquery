Cypress.Commands.add('guess', (colors) => {
    colors.forEach((color, i) => {
        cy.get('.current').find('.guess-holes').find('.guess-hole').eq(i).click();
        cy.get(`.color-${color+1}`).click();
    });
    cy.get('.check-button').click();
});
Cypress.Commands.add('forceClick', {prevSubject: 'element'}, (subject, options) => {
    cy.wrap(subject).click({force: true})
});