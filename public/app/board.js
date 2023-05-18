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
            this.callable = (e) => {
                if (this.active) {
                    callable(e);
                }
                e.stopPropagation();
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
            $(".code-hole").removeClass('covered').each(function () {
                $(this).css('background-color', $(this).data('color'));
            });
        },

        hide() {
            $(".code-hole").addClass('covered');
        },

        hint() {
            if (!this.toHint()) {
                return;
            }
            let candidates = $('.code-hole.covered');
            let randomIndex = Math.floor(Math.random() * candidates.length);
            let candidate = candidates.eq(randomIndex);
            candidate.css('background-color', candidate.data('color'));
            candidate.removeClass('covered');
        },

        toHint() {
            return $('.code-hole.covered').length > 1;
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
                    if (numberOfPins === 2 && i === 0 || numberOfPins === 3 && i === 1 ||
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
            for (let feedback = $('.current .feedback-hole'), i = 0; i < blackPins + whitePins; i++) {
                feedback.eq(i).addClass(i < blackPins ? 'black-feedback' : 'white-feedback');
            }
        }
    }

    helpButton = {__proto__: this.disableable, qualifier: '.help-button'};
    hintButton = {__proto__: this.disableable, qualifier: '.hint-button'};
    checkButton = {__proto__: this.disableable, qualifier: '.check-button'};
    configButton = {__proto__: this.disableable, qualifier: '.config-button'};
    quitButton = {__proto__: this.disableable, qualifier: '.quit-button'};
    startButton = {__proto__: this.disableable, qualifier: '.start-button'};

    playingInfo = {
        __proto__: this.hideable,
        qualifier: '.playing',
        init() {
            $('.playing').html('Playing... <span id="seconds"></span>');
        }
    };

    endModal = EndModal;
    configModal = ConfigModal;
    helpModal = HelpModal;

    game = null;

    constructor() {
        this.helpButton.bind(() => this.helpModal.show());
    }

    init(game) {
        this.game = game;
        Colorpicker.init(this.game.getColors(), () => {
            if (this.guessRow.isFilled()) {
                this.checkButton.enable();
            }
        });
        this.configButton.bind(() => this.configModal.show(this.game));
        this.configButton.enable();
        this.hintButton.disable();
        this.quitButton.hide();
        this.playingInfo.hide();
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
        this.playingInfo.init();
        this.playingInfo.show();
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
        this.playingInfo.hide();
    }
}