import Secret from '../../src/app/secret'

describe('Unit Test Secret Code', function () {

    let {get, set, generateSecret, checkGuess} = Secret;

    generateSecret = generateSecret.bind(Secret);
    get = get.bind(Secret);
    set = set.bind(Secret);
    checkGuess = checkGuess.bind(Secret);

    before(() => {
        expect(generateSecret, 'generateSecret').to.be.a('function')
    })


    it('generates secret of correct length and values', function () {
        for (let pins = 1; pins <= 6; pins++) {
            for (let colors = 1; colors <= 7; colors++) {
                generateSecret([1, 2, 3, 4, 5, 6, 7].slice(0, colors), pins);
                expect(get()).to.have.length(pins);
                for (let index = 0; index < get().length; index++) {
                    expect(get()[index]).not.greaterThan(colors);
                }
            }
        }
    });

    function evalGuesses(guesses) {
        guesses.forEach(([code, guess, expectedBlack, expectedWhite]) => {
            set(code);
            let [black, white] = checkGuess(guess);
            expect(black, 'black pin count mismatch when guessing ' + guess + ' for secret ' + code).eq(expectedBlack);
            expect(white, 'white pin count mismatch when guessing ' + guess + ' for secret ' + code).eq(expectedWhite);
        });
    }

    it('checks guess correctly with no black or white pins', function () {
        evalGuesses([
            [[1, 2, 3, 4], [0, 0, 0, 0], 0, 0],
            [[1, 1, 2, 3], [0, 0, 0, 0], 0, 0],
            [[1, 1, 1, 2], [3, 3, 3, 3], 0, 0],
            [[1, 1, 1, 1], [3, 3, 3, 3], 0, 0]
        ]);
    });

    it('checks guess correctly with one white pin', function () {
        evalGuesses([
            [[1, 2, 3, 4], [0, 0, 2, 0], 0, 1],
            [[1, 2, 3, 4], [2, 0, 0, 0], 0, 1],
            [[1, 2, 3, 4], [0, 0, 2, 2], 0, 1],
            [[1, 2, 3, 4], [2, 0, 2, 2], 0, 1],
            [[2, 2, 3, 4], [0, 0, 0, 2], 0, 1],
            [[2, 3, 2, 4], [0, 0, 0, 2], 0, 1],
            [[2, 2, 2, 4], [0, 0, 0, 2], 0, 1]
        ]);
    });

    it('checks guess correctly with one black pin', function () {
        evalGuesses([
            [[1, 2, 3, 4], [0, 2, 0, 0], 1, 0],
            [[1, 2, 3, 4], [2, 2, 0, 0], 1, 0],
            [[1, 2, 3, 4], [0, 2, 2, 2], 1, 0],
            [[1, 2, 3, 4], [2, 2, 2, 2], 1, 0],

            [[2, 2, 3, 4], [0, 2, 0, 0], 1, 0],
            [[2, 2, 2, 4], [0, 0, 2, 0], 1, 0],
            [[2, 2, 2, 2], [0, 0, 0, 2], 1, 0]
        ]);
    });

    it('checks guess correctly with two white pins', function () {
        evalGuesses([
            [[1, 2, 3, 2], [2, 0, 0, 3], 0, 2],
            [[2, 4, 2, 3], [3, 2, 0, 0], 0, 2],
            [[2, 2, 2, 3], [3, 0, 0, 2], 0, 2],
            [[2, 2, 3, 3], [0, 0, 2, 2], 0, 2]
        ]);
    });

    it('checks guess correctly with two black pins', function () {
        evalGuesses([
            [[1, 2, 3, 2], [0, 2, 0, 2], 2, 0],
            [[2, 4, 2, 3], [2, 4, 0, 0], 2, 0],
            [[2, 2, 2, 3], [3, 3, 2, 3], 2, 0],
            [[2, 2, 2, 2], [0, 0, 2, 2], 2, 0],
            [[1, 2, 2, 4], [0, 2, 2, 2], 2, 0]
        ]);
    });

    it('checks guess correctly with one black and one white pin', function () {
        evalGuesses([
            [[1, 2, 3, 2], [0, 2, 0, 1], 1, 1],
            [[2, 4, 2, 3], [3, 4, 0, 0], 1, 1],
            [[2, 2, 3, 3], [3, 3, 0, 3], 1, 1],
            [[1, 2, 2, 2], [0, 1, 0, 2], 1, 1],
            [[1, 2, 2, 3], [2, 2, 4, 2], 1, 1],
        ]);
    });

    it('checks guess correctly with three white pins', () => {
        evalGuesses([
            [[1, 2, 3, 4], [2, 3, 4, 0], 0, 3],
            [[1, 2, 3, 4], [2, 1, 1, 3], 0, 3],
            [[1, 1, 3, 4], [3, 3, 1, 1], 0, 3],
        ]);
    });

    it('checks guess correctly with three black pins', () => {
        evalGuesses([
            [[1, 2, 3, 4], [0, 2, 3, 4], 3, 0],
            [[1, 1, 3, 4], [1, 1, 0, 4], 3, 0],
            [[1, 2, 3, 4], [1, 2, 3, 3], 3, 0],
            [[1, 1, 1, 1], [1, 1, 0, 1], 3, 0],
        ]);
    });

    it('checks guess correctly with two black pins and one white pin', () => {
        evalGuesses([
            [[1, 2, 3, 4], [2, 2, 3, 1], 2, 1],
            [[1, 2, 3, 4], [1, 2, 1, 3], 2, 1],
            [[2, 2, 3, 4], [2, 2, 2, 3], 2, 1],
            [[2, 2, 2, 3], [2, 2, 3, 0], 2, 1],
            [[2, 2, 1, 1], [0, 2, 2, 1], 2, 1],
        ]);
    });

    it('checks guess correctly with one black pin and two white pins', () => {
        evalGuesses([
            [[1, 2, 3, 4], [0, 1, 3, 2], 1, 2],
            [[1, 1, 3, 4], [1, 4, 1, 1], 1, 2],
            [[1, 1, 2, 1], [2, 1, 1, 0], 1, 2],
            [[1, 1, 1, 2], [1, 0, 2, 1], 1, 2],
        ]);
    });

    it('checks guess correctly with four white pins', () => {
        evalGuesses([
            [[1, 2, 3, 4], [2, 3, 4, 1], 0, 4],
            [[1, 2, 2, 4], [2, 1, 4, 2], 0, 4],
            [[2, 1, 1, 2], [1, 2, 2, 1], 0, 4],
        ]);
    });

    it('checks guess correctly with four black pins', () => {
        evalGuesses([
            [[1, 2, 3, 4], [1, 2, 3, 4], 4, 0],
            [[1, 1, 2, 2], [1, 1, 2, 2], 4, 0],
            [[1, 1, 1, 2], [1, 1, 1, 2], 4, 0],
            [[1, 1, 1, 1], [1, 1, 1, 1], 4, 0],
        ]);
    });

    it('checks guess correctly with two black and two white pins', () => {
        evalGuesses([
            [[1, 1, 2, 2], [2, 1, 2, 1], 2, 2],
            [[1, 2, 3, 4], [1, 2, 4, 3], 2, 2],
            [[1, 1, 1, 2], [1, 1, 2, 1], 2, 2],
        ]);
    });

    it('checks guess correctly with one black pin and three white pins', () => {
        evalGuesses([
            [[1, 2, 3, 4], [1, 4, 2, 3], 1, 3],
            [[1, 1, 2, 3], [1, 2, 3, 1], 1, 3],
        ]);
    });

    it('checks guess correctly with three black pins and one white pin', () => {
        // not possible
    });
})