import React, { useState, useEffect } from 'react'
// let i = 0;
// let interval = setInterval(() => {
//     triggerResize();
//     if (i === 5){ clearInterval(interval) }
//     i++;
// }, 1000);
// var lastTime = 0;
// var vendors = ['ms', 'moz', 'webkit', 'o'];

// TODO: ADD RESIZEE HANDLER
// https://github.com/ampersanda/shimming-page-example/blob/master/index.html

export function useScroller() {
    const [scrollPosition, setScrollPosition] = useState()

    let scrollTop = 0, tweened = 0, winHeight = 0, requestId: any
    const update = () => {
        requestId = window.requestAnimationFrame(update);

        if (Math.abs(scrollTop - tweened) > 0) {
            let top = tweened += .10 * (scrollTop - tweened)
            setScrollPosition(top)
        }
    };

    const listen = function (el: any, on: any, fn: any) {
        (el.addEventListener || (on = 'on' + on) && el.attachEvent)(on, fn, false);
    };

    const scroll = function () {
        scrollTop = Math.max(0, document.documentElement.scrollTop || window.pageYOffset || 0);
    };

    listen(window, 'scroll', scroll);

    useEffect(() => {
        update();
        return () => {
            window.cancelAnimationFrame(requestId)
        }
    }, [])

    return [scrollPosition]
}
