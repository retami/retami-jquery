const ColorPicker = (function () {

    let selectedColorButton = null;
    let callback = null;

    function show(e) {
        selectedColorButton = e.target;
        let colorPicker = document.querySelector('.color-picker');
        colorPicker.classList.toggle('visible');

        let rect = selectedColorButton.getBoundingClientRect();
        let viewport = window.visualViewport;

        // https://developer.chrome.com/blog/visual-viewport-api/
        colorPicker.style.top = Math.round(viewport.pageTop + rect.y + rect.height / 2) + 'px';
        colorPicker.style.left = Math.round(viewport.pageLeft + rect.x + rect.width / 2) + 'px';

        e.stopPropagation();
    }

    function init(colors, callbackArg = null) {
        callback = callbackArg;
        const colorpicker = document.createElement("div");
        colorpicker.classList.add("color-picker");
        for (let i = 1; i <= colors.length; i++) {
            let coloroption = document.createElement("div");
            coloroption.classList.add("color-option");
            coloroption.classList.add("color-" + i);
            coloroption.style.backgroundColor = colors[i - 1];
            let x = Math.floor(Math.cos(2 * (i - 1) / colors.length * Math.PI) * 40 - 17);
            let y = Math.floor(Math.sin(2 * (i - 1) / colors.length * Math.PI) * 40 - 17);
            coloroption.style.top = x + "px";
            coloroption.style.left = y + "px";
            coloroption.addEventListener('click', (e) => {
                selectedColorButton.style.backgroundColor = window.getComputedStyle(e.target).backgroundColor;
                colorpicker.classList.toggle('visible');
                e.stopPropagation();
            });
            if (callback !== null) {
                coloroption.addEventListener('click', callback);
            }
            colorpicker.appendChild(coloroption);
        }

        document.addEventListener('click', function (e) {
            if (colorpicker.classList.contains('visible')) {
                colorpicker.classList.toggle('visible');
                e.stopPropagation();
            }
        });

        if (document.querySelector('.color-picker') !== null) {
            document.querySelector('.color-picker').remove();
        }
        document.body.appendChild(colorpicker);
    }

    return {
        init: function (colors, callback = null) {
            init(colors, callback);
        },
        show: function (e) {
            show(e);
        }
    };
})
();

export default ColorPicker;