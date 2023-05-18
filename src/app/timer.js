const Timer = (function () {
    let timer = null;
    let view = null;

    function start(qualifier) {
        const start = Date.now();
        view = $(qualifier);
        view.html('0');
        timer = window.setInterval(function() {
            view.html((Math.floor((Date.now() - start) / 1000)).toString() + "s");
        }, 1000);
    }

    function stop() {
        window.clearInterval(timer);
    }

    function getTime() {
        return view.html()
    }

    return {
        start: start,
        stop: stop,
        getTime: getTime
    };
})
();

export default Timer;