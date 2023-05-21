import $ from "jquery";
import "jquery-ui/ui/widgets/slider";

export default {

    callable: null,

    bind(callable) {
        this.callable = callable;
    },

    show: function (game) {
        let config = $('.modal');
        config.html(this.html2(game));

        $('.pref-colors button').eq(game.numberOfColors - 2).addClass('selected');
        $('.pref-pins button').eq(game.numberOfPins - 2).addClass('selected');
        $('.pref-guesses button').eq([2, 4, 6, 7, 8, 10, 12].indexOf(game.maxAttempts)).addClass('selected');

        $('.pref-colors').on('click', function (e) {
            $('.pref-colors .selected').removeClass('selected');
            $(e.target).addClass('selected');
            $("#config_colors").val($(e.target).text());
        });

        $('.pref-pins').on('click', function (e) {
            $('.pref-pins .selected').removeClass('selected');
            $(e.target).addClass('selected');
            $("#config_pins").val($(e.target).text());
        });

        $('.pref-guesses').on('click', function (e) {
            $('.pref-guesses .selected').removeClass('selected');
            $(e.target).addClass('selected');
            $("#config_guesses").val($(e.target).text());
        });

        /*
                    $("#config_colors_slider").slider({
                        value: game.numberOfColors,
                        min: 2,
                        max: 7,
                        step: 1,
                        slide: function (event, ui) {
                            $("#config_colors").val(ui.value);
                            $("#config_colors_text").text(ui.value);
                        }
                    });

                    $("#config_pins_slider").slider({
                        value: game.numberOfPins,
                        min: 2,
                        max: 5,
                        step: 1,
                        slide: function (event, ui) {
                            $("#config_pins").val(ui.value);
                            $("#config_pins_text").text(ui.value);
                        }
                    });

                    $("#config_guesses_slider").slider({
                        value: game.maxAttempts,
                        min: 2,
                        max: 12,
                        step: 1,
                        slide: function (event, ui) {
                            $("#config_guesses").val(ui.value);
                            $("#config_guesses_text").text(ui.value);
                        }
                    });
        */
        config.css('display', 'block');
        $('.modal-button').on('click', () => {
            this.callable();
            config.css('display', 'none');
            $('.modal-button').off('click');
        });
    },
    html: function (game) {
        return `<div id='config-modal'>
                <div id='config_dialog'>
                <label id='colors_label'>Colors: </label>
                <div id='config_colors_text'>${game.numberOfColors}</div>
                <div id='config_colors_slider'></div>

                <label id='pins_label'>Pins: </label>
                <div id='config_pins_text'>${game.numberOfPins}</div>
                <div id='config_pins_slider'></div>

                <label id='guesses_label'>Guesses: </label>
                <div id='config_guesses_text'>${game.maxAttempts}</div>
                <div id='config_guesses_slider'></div>
                <form>
                <input type='hidden' value='${game.numberOfColors}' id='config_colors' />
                <input type='hidden' value='${game.numberOfPins}' id='config_pins' />
                <input type='hidden' value='${game.maxAttempts}' id='config_guesses' />
                </form>
                </div>
                <div class="modal-button">OK</div>
                `;
    },

    html2: function (game) {
        return `<div id='config-modal'>
                <div id='config_dialog'>
                
                <label id='colors_label'>Colors: </label>
                <div class="pref-colors button-row">
                  <button>2</button>
                  <button>3</button>
                  <button>4</button>
                  <button>5</button>
                  <button>6</button>
                  <button>7</button>
                </div>

                <label id='pins_label'>Pins: </label>
                <div class="pref-pins button-row">
                  <button>2</button>
                  <button>3</button>
                  <button>4</button>
                  <button>5</button>
                  <button>6</button>
                </div>

                <label id='guesses_label'>Guesses: </label>
                <div class="pref-guesses button-row">
                  <button>2</button>
                  <button>4</button>
                  <button>6</button>
                  <button>7</button>
                  <button>8</button>
                  <button>10</button>
                  <button>12</button>
                </div>
                
                <form>
                <input type='hidden' value='${game.numberOfColors}' id='config_colors' />
                <input type='hidden' value='${game.numberOfPins}' id='config_pins' />
                <input type='hidden' value='${game.maxAttempts}' id='config_guesses' />
                </form>
                </div>
                <div class="modal-button">OK</div>
                `;
    }
}