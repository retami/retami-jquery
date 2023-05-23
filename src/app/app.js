import $ from "jquery";
import Timer from "./timer.js";
import Board from "./board.js";
import Secret from "./secret.js";

const App = {
    game: {
        colors: [
            'rgb(244, 67, 54)',
            'rgb(233, 30, 99)',
            'rgb(156, 39, 176)',
            'rgb(76, 175, 80)',
            'rgb(255, 235, 59)',
            'rgb(121, 85, 72)',
            'rgb(33, 150, 243)',
        ],
        numberOfColors: 5,
        numberOfPins: 4,
        maxAttempts: 7,
        getColors: function () {
            return this.colors.slice(0, this.numberOfColors);
        }
    },

    attempts: 0,
    board: null,
    secret: Secret,

    run: function () {
        this.board = new Board();
        this.board.init(this.game);
        this.board.startButton.bind(() => this.handleStartClick());
        this.board.checkButton.bind(() => this.handleCheckClick());
        this.board.hintButton.bind(() => this.handleHintClick());
        this.board.quitButton.bind(() => this.handleQuitClick());
        this.board.configModal.bind(() => this.config());
    },

    handleStartClick: function () {
        this.attempts = 0;
        this.secret.generateSecret(this.game.getColors(), this.game.numberOfPins);
        this.board.setStatePlaying(this.secret);
        Timer.start("#seconds");
    },

    handleCheckClick: function () {
        const guess = this.board.guessRow.getGuess();

        const [blackPins, whitePins] = this.secret.checkGuess(guess);
        this.board.guessRow.showFeedback(blackPins, whitePins);
        this.board.guessRow.disable();
        this.board.checkButton.disable();
        this.attempts++;

        if (blackPins === this.game.numberOfPins || this.attempts === this.game.maxAttempts) {
            this.endGame(blackPins === this.game.numberOfPins);
            return;
        }

        this.board.guessRow.enableNextRow();

    },

    handleHintClick: function () {
        this.board.secretHoles.hint();
        if (!this.board.secretHoles.toHint()) {
            this.board.hintButton.disable();
        }
    },

    handleQuitClick: function () {
        this.board.setStateGameOver();
        Timer.stop();
        this.board.endModal.quit();
    },

    endGame: function (won) {
        this.board.setStateGameOver();
        Timer.stop();
        if (won) {
            this.board.endModal.won(this.attempts, this.game.numberOfColors, this.game.numberOfPins, Timer.getTime());
        } else {
            this.board.endModal.lost();
        }
    },

    config: function () {
        this.game.numberOfColors = parseInt($('#config_colors').val());
        this.game.numberOfPins = parseInt($('#config_pins').val());
        this.game.maxAttempts = parseInt($('#config_guesses').val());
        this.board.init(this.game);
    },

    getSecret() {
        return this.secret;
    }
}

export default {
    run: () => App.run(),
    secret: App.secret,
    game: App.game
}