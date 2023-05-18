import $ from "jquery";
import Timer from "./timer.js";
import Board from "./board.js";
import Secret from "./secret.js";

const App = (function () {
    const colors = [
        'rgb(244, 67, 54)',
        'rgb(233, 30, 99)',
        'rgb(156, 39, 176)',
        'rgb(76, 175, 80)',
        'rgb(255, 235, 59)',
        'rgb(121, 85, 72)',
        'rgb(33, 150, 243)',
    ];

    let game = {
        numberOfColors: 5,
        numberOfPins: 4,
        maxAttempts: 7,
        colors: colors,
        getColors: function () {
            return this.colors.slice(0, this.numberOfColors);
        }
    };

    let attempts;
    let board;
    var secret = Secret;

    function run() {
        board = new Board();
        board.init(game);
        board.startButton.bind(handleStartClick);
        board.checkButton.bind(handleCheckClick);
        board.hintButton.bind(handleHintClick);
        board.quitButton.bind(handleQuitClick);
        board.configModal.bind(config);
    }

    function handleStartClick() {
        attempts = 0;
        secret.generateSecret(game.getColors(), game.numberOfPins);
        board.setStatePlaying(secret);
        Timer.start("#seconds");
    }

    function handleCheckClick() {
        const guess = board.guessRow.getGuess();

        let [blackPins, whitePins] = secret.checkGuess(guess);
        board.guessRow.showFeedback(blackPins, whitePins);
        board.guessRow.disable();
        board.checkButton.disable();
        attempts++;

        if (blackPins === game.numberOfPins || attempts === game.maxAttempts) {
            endGame(blackPins === game.numberOfPins);
            return;
        }

        board.guessRow.enableNextRow();
    }

    function handleHintClick() {
        board.secretHoles.hint();
        if(! board.secretHoles.toHint()) {
            board.hintButton.disable();
        }
    }

    function handleQuitClick() {
        board.setStateGameOver();
        Timer.stop();
        board.endModal.quit();
    }

    function endGame(won) {
        board.setStateGameOver();
        Timer.stop();
        if (won) {
            board.endModal.won(attempts, game.numberOfColors, game.numberOfPins, Timer.getTime());
        } else {
            board.endModal.lost();
        }
    }

    function config() {
        game.numberOfColors = parseInt($('#config_colors').val());
        game.numberOfPins = parseInt($('#config_pins').val());
        game.maxAttempts = parseInt($('#config_guesses').val());
        board.init(game);
    }

    return {
        run: run,
    };
})
();

export default App;