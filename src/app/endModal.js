import $ from "jquery";

export default {

    wonHtml: `<div id="win-modal">
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
                    </div>`,

    won: function (attempts, colors, pins, time) {
        let modal = $('.modal');
        modal.html(this.wonHtml);

        $('#score_guesses').html(attempts);
        $('#score_colors').html(colors);
        $('#score_pins').html(pins);
        $('#score_time').html(time);

        this.showModal(modal);
    },

    lostHtml: `<div id="lost-modal">
            <div class="title">You lost!</div>
            </div>`,

    lost: function () {
        let modal = $('.modal');
        modal.html(this.lostHtml);
        this.showModal(modal);
    },

    quitHtml: `<div id="quit-modal">
            <div class="title">You quit!</div>
            </div>`,

    quit() {
        let modal = $('.modal');
        modal.html(this.quitHtml);
        this.showModal(modal);
    },

    showModal(modal) {
        modal.css('display', 'block');
        $(document).one('click', function (ev) {
            modal.css('display', 'none');
            ev.stopPropagation();
        });
    }
}