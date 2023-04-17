const EndModal = (function () {

    return {
        wonHtml: `<div class="win-modal">
                        <div class="title">You won!</div>
                        <div class="content">
                            <div class="left">
                                Guesses:<br/>
                                Time:<br/>
                                Colors:<br/>
                                Pins:<br/>
                            </div>
                            <div class="right">
                                <span id="score_guesses"></span><br/>
                                <span id="score_time"></span><br/>
                                <span id="score_colors"></span><br/>
                                <span id="score_pins"></span><br/>
                            </div>
                        </div>
                    <div class="modal-button">OK</div>
                    </div>`,

        won: function (attempts, colors, pins, time) {
            let modal = $('.modal');
            modal.html(this.wonHtml);

            $('#score_guesses').html(attempts);
            $('#score_colors').html(colors);
            $('#score_pins').html(pins);
            $('#score_time').html(time);

            modal.css('display', 'block');
            $('.modal-button').on('click', () => {
                modal.css('display', 'none');
                $('.modal-button').off('click');
            });
        },

        lostHtml: `<div id="lost-modal">
            <div class="title">You lost!</div>
            <div class="modal-button">OK</div>
            </div>`,

        lost: function () {
            let modal = $('.modal');
            modal.html(this.lostHtml);
            modal.css('display', 'block');
            $('.modal-button').on('click', () => {
                modal.css('display', 'none');
                $('.modal-button').off('click');
            });
        },

        quitHtml: `<div id="quit-modal">
            <div class="title">You quit!</div>
            <div class="modal-button">OK</div>
            </div>`,

        quit() {
            let modal = $('.modal');
            modal.html(this.quitHtml);
            modal.css('display', 'block');
            $('.modal-button').on('click', () => {
                modal.css('display', 'none');
                $('.modal-button').off('click');
            });
        },
    };
})
();

export default EndModal;