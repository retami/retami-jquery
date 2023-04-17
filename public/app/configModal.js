const ConfigModal = (function () {

    return {
        callable: null,
        bind(callable) {
            this.callable = callable;
        },
        show: function(game) {
            let config = $('.modal');
            config.html(this.html(game));
            config.css('display', 'block');
            $('.modal-button').on('click', () => {
                this.callable();
                config.css('display', 'none');
                $('.modal-button').off('click');
            });
        },
        html: function(game) {
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
                  <script>
                  $( function() {
                    $( "#config_colors_slider" ).slider({
                      value: ${game.numberOfColors},
                      min: 2,
                      max: 7,
                      step: 1,
                      slide: function( event, ui ) {
                        $( "#config_colors" ).val( ui.value );
                        $( "#config_colors_text" ).text( ui.value );
                      }
                    });
                  } );
                  $( function() {
                    $( "#config_pins_slider" ).slider({
                      value: ${game.numberOfPins},
                      min: 2,
                      max: 5,
                      step: 1,
                      slide: function( event, ui ) {
                        $( "#config_pins" ).val( ui.value );
                        $( "#config_pins_text" ).text( ui.value );
                      }
                    });
                  } );
                  $( function() {
                    $( "#config_guesses_slider" ).slider({
                      value: ${game.maxAttempts},
                      min: 2,
                      max: 12,
                      step: 1,
                      slide: function( event, ui ) {
                        $( "#config_guesses" ).val( ui.value );
                        $( "#config_guesses_text" ).text( ui.value );
                      }
                    });
                  } );
                  </script>
                </div>`;
        }
    };
})
();

export default ConfigModal;