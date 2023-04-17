describe('Full game', () => {

    var fixture;

    const colors = [
        'rgb(244, 67, 54)',
        'rgb(233, 30, 99)',
        'rgb(156, 39, 176)',
        'rgb(76, 175, 80)',
        'rgb(255, 235, 59)',
        'rgb(121, 85, 72)'
    ];

    before(function () {
        cy.fixture('fullgame').then(function (data) {
            fixture = data;
        })
    })


    it('play', () => {
        cy.viewport(550, 1000);
        cy.visit('/');
        cy.get('.start-button').click();
        for(let i=0; i<3; i++)
        {
            cy.guess(fixture.game.guesses[i].guess);
        }
    });
});