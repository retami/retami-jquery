const HelpModal = (function () {

    return {
        helpText: `<div id="help-modal">
        <p >The goal of the game is to crack the code in as few attempts as possible.
        The code is made up of 4 colors. Each color can be used multiple times. After each guess,
        you will get feedback in the form of black and white pins. A black pin means that you have
        guessed a color and its position correctly. A white pin means that you have guessed a color
        correctly, but not its position. You can use the hint button to reveal one of the colors in
        the code. Good luck!</p>
        <div class="modal-button">OK</div>
        </div>`,

        show: function() {
            let modal = $('.modal');
            modal.html(this.helpText);
            modal.css('display', 'block');
            $('.modal-button').on('click', () => {
                modal.css('display', 'none');
                $('.modal-button').off('click');
            });
        },
    };
})
();

export default HelpModal;