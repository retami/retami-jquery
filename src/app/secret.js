const Secret = (function () {
    let code = [];

    function get() {
        return code;
    }

    function set(code) {
        code = this.code;
    }

    function generateSecret(colors, numberOfPins) {
        code = [];
        for (let i = 0; i < numberOfPins; i++) {
            const randomIndex = Math.floor(Math.random() * colors.length);
            code.push(colors[randomIndex]);
        }
    }

    function checkGuess(guess) {
        let blackPins = 0;
        let whitePins = 0;
        const secretCopy = [...code];
        const guessCopy = [...guess];

        // Check for black pins
        for (let i = 0; i < guess.length; i++) {
            if (guessCopy[i] === secretCopy[i]) {
                blackPins++;
                guessCopy[i] = null;
                secretCopy[i] = null;
            }
        }

        // Check for white pins
        for (let i = 0; i < guess.length; i++) {
            if (secretCopy[i] !== null) {
                for (let j = 0; j < guess.length; j++) {
                    if (guessCopy[j] !== null && guessCopy[j] === secretCopy[i]) {
                        whitePins++;
                        guessCopy[j] = null;
                        secretCopy[i] = null;
                    }
                }
            }
        }

        return [blackPins, whitePins];
    }

    return {
        get: get, // function () { return get() },
        set: set,
        generateSecret: function (colors, numberOfPins) {
            generateSecret(colors, numberOfPins)
        },
        checkGuess: function (guess) {
            return checkGuess(guess)
        },
    };
})
();

export default Secret;