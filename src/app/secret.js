const Secret = {
    code: [],

    get: function () {
        return this.code;
    },

    set: function (c) {
        this.code = c;
    },

    generateSecret: function (colors, numberOfPins) {
        this.code = [];
        for (let i = 0; i < numberOfPins; i++) {
            const randomIndex = Math.floor(Math.random() * colors.length);
            this.code.push(colors[randomIndex]);
        }
    },

    checkGuess: function (guess) {
        let blackPins = 0;
        let whitePins = 0;
        const secretCopy = [...this.code];
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
    },
}

export default Secret;