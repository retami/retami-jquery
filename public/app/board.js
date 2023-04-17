import Colorpicker from "./colorpicker.js";
import ConfigModal from "./configModal.js";
import EndModal from "./endModal.js";
import HelpModal from "./helpModal.js";

export default class Board {

    hideable = {
        qualifier: null,
        show() {
            $(this.qualifier).removeClass('hidden');
        },

        hide() {
            $(this.qualifier).addClass('hidden');
        },
    }

    disableable = {
        __proto__: this.hideable,
        qualifier: null,
        callable: null,
        active: true,

        bind(callable) {
            if (this.callable !== null) {
                $(this.qualifier).off('click', this.callable);
            }
            this.callable = () => {
                if (this.active) {
                    callable();
                }
            }
            $(this.qualifier).on('click', this.callable)
        },

        enable() {
            this.active = true;
            $(this.qualifier).removeClass('disabled');
        },

        disable() {
            this.active = false;
            $(this.qualifier).addClass('disabled');
        },
    }

    secretHoles = {
        init(numberOfPins) {
            $(".code-row").html('');
            for (let i = 0; i < numberOfPins; i++) {
                $("<div>", {"class": "code-hole"}).appendTo(".code-row");
            }
        },

        set(secret) {
            $(".code-hole").each(function (i) {
                $(this).data('color', secret.get()[i]);
            });
        },

        show() {
            $(".code-hole").removeClass('covered');
        },

        hide() {
            $(".code-hole").addClass('covered');
        },

        hint() {
            let candidates = $('.code-hole.covered');
            let randomIndex = Math.floor(Math.random() * candidates.length);
            let candidate = candidates.eq(randomIndex);
            candidate.css('background-color', candidate.data('color'));
            candidate.removeClass('covered');
        }
    }

    guessRow = {
        initRows(numberOfRows, numberOfPins) {
            $('#guesses').html('');
            for (let i = 0; i < numberOfRows; i++) {
                let guessRow = $("<div>", {"class": "guess-row"}).appendTo("#guesses");
                let guessHoles = $("<div>", {"class": "guess-holes"}).appendTo(guessRow);
                let feedbackHoles = $("<div>", {"class": "feedback-holes"}).appendTo(guessRow);
                for (let i = 0; i < numberOfPins; i++) {
                    $("<div>", {"class": "guess-hole"}).appendTo(guessHoles).addClass('disabled');
                    $("<div>", {"class": "feedback-hole"}).appendTo(feedbackHoles);
                    if(numberOfPins === 2 && i === 0 || numberOfPins === 3 && i === 1 ||
                        numberOfPins === 4 && i === 1 || numberOfPins === 5 && i === 2 || numberOfPins === 6 && i === 2) {
                        $("<div>", {"class": "feedback-spacer"}).appendTo(feedbackHoles);
                    }
                }
            }
            $('.guess-row:first').addClass('current');
        },

        activateNextRow() {
            let current = $('.current');
            current.removeClass('current');
            current.next().addClass('current');
            this.enable();
        },

        getGuess() {
            return $('.current .guess-hole').map(function () {
                return $(this).css('background-color')
            }).get();
        },

        disable() {
            $('.current .guess-hole').off('click', Colorpicker.show).addClass('disabled');
        },

        enable() {
            $('.current .guess-hole').on('click', Colorpicker.show).removeClass('disabled');
        },

        isFilled() {
            return !this.getGuess().includes('rgba(0, 0, 0, 0)');
        },

        showFeedback(blackPins, whitePins) {
            const feedbackHoles = $('.current .feedback-hole');

            for (let i = 0; i < blackPins; i++) {
                feedbackHoles.eq(i).addClass('black-feedback');
            }
            for (let i = 0; i < whitePins; i++) {
                feedbackHoles.eq(blackPins + i).addClass('white-feedback');
            }
        }
    }


    hintButton = Object.create(this.disableable, {qualifier: {value: '.hint-button'}});
    checkButton = Object.create(this.disableable, {qualifier: {value: '.check-button'}});
    configButton = Object.create(this.disableable, {qualifier: {value: '.config-button'}});
    quitButton = Object.create(this.disableable, {qualifier: {value: '.quit-button'}});
    startButton = Object.create(this.disableable, {
        qualifier: {value: '.start-button'},
        bind: {
            value: function (callable) {
                $('.start-button').on('click', callable);
            }
        }
    });
    playing = Object.create(this.hideable, {
        qualifier: {value: '.playing'},
        init: {
            value: function () {
                $('.playing').html('Playing... <span id="seconds"></span>');
            }
        }
    });

    endModal = EndModal;

    config = ConfigModal;

    helpModal = HelpModal;

    game = null;

    constructor() {
        this.hintButton.bind(this.secretHoles.hint);
        $('.help-button').on('click', () => this.helpModal.show());
    }

    init(game) {
        this.game = game;
        Colorpicker.init(this.game.getColors(), () => {
            if (this.guessRow.isFilled()) {
                this.checkButton.enable();
            }
        });
        this.configButton.bind(() => this.config.show(this.game));
        this.configButton.enable();
        this.hintButton.disable();
        this.quitButton.hide();
        this.playing.hide();
        this.guessRow.initRows(this.game.maxAttempts, this.game.numberOfPins);
        this.secretHoles.init(this.game.numberOfPins);
    }

    setStatePlaying(secret) {
        this.secretHoles.hide();
        this.guessRow.initRows(this.game.maxAttempts, this.game.numberOfPins);
        this.guessRow.enable();
        this.startButton.hide();
        this.checkButton.disable();
        this.checkButton.show();
        this.hintButton.enable();
        this.configButton.disable();
        this.quitButton.show();
        this.playing.init();
        this.playing.show();
        this.secretHoles.set(secret);
    }

    setStateGameOver() {
        this.guessRow.disable();
        this.secretHoles.show();
        this.checkButton.disable();
        this.checkButton.hide();
        this.hintButton.disable();
        this.startButton.show();
        this.configButton.enable();
        this.quitButton.hide();
        this.playing.hide();
    }
}