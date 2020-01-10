import React, { useState, useRef, useEffect, RefObject, useMemo } from "react"
import { debounce } from "lodash"
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

export function useScroller(ref: RefObject<HTMLDivElement>, isDisabled) {
  // const [scrollPosition, setScrollPosition] = useState(0)
  const scrollPosition = useRef(undefined)
  let scrollTop = 0
  let tweened = 0
  let winHeight = 0
  // ref stores values between renders
  const reqId = useRef(undefined)
  let prevValue = 0
  let top = 0

  const update = () => {
    reqId.current = undefined
    if (Math.abs(scrollTop - tweened) > 0) {
      top = Math.floor((tweened += 0.1 * (scrollTop - tweened)))
      // ref.current.style.transform = `translate3d(0px, -${top}px, 0px)`

      if (top !== prevValue) {
        // setScrollPosition(top)
        scrollPosition.current = top
        prevValue = top
        if (ref.current) {
          ref.current.style.transform = `translate3d(0px, -${top}px, 0px)`
        }
      }
    }
    start()
  }

  const start = () => {
    if (!reqId.current) {
      reqId.current = window.requestAnimationFrame(update)
      return scrollPosition
    }
  }

  const stop = () => {
    window.cancelAnimationFrame(reqId.current)
    reqId.current = undefined
  }

  const listen = function(el: any, on: any, fn: any) {
    ;(el.addEventListener || ((on = "on" + on) && el.attachEvent))(
      on,
      fn,
      false
    )
  }

  const scroll = function() {
    scrollTop = Math.max(
      0,
      document.documentElement.scrollTop || window.pageYOffset || 0
    )
  }

  listen(window, "scroll", scroll)

  useEffect(() => {
    if (isDisabled) {
      return stop()
    } else {
      start()
    }
  }, [isDisabled])

  return window.scrollY
}
