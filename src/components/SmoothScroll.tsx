import React, { useState, useEffect, useRef } from "react"
import ResizeObserver from "resize-observer-polyfill"
import { animated, useSpring, config } from "react-spring"

const trans = y => `translate3d(0px, -${y}px,0px)`

const SmoothScroll = props => {
  const viewPortRef = useRef()
  const [contentHeight, setHeight] = useState(window.innerHeight)
  const [screenHeight, setCreenHeight] = useState(window.innerHeight)
  const [scrollCount, setScrolLCount] = useState(0)
  const [animProps, setY] = useSpring(() => ({
    immediate: false,
    y: 0,
    config: {
      ...config.gentle,
      clamp: false,
    },
  }))

  const isBottom = () => {
    if (scrollCount + screenHeight >= contentHeight) {
      return true
    }
    return false
  }

  const onWheel = e => {
    if (e.deltaY < 0) {
      setScrolLCount(scrollCount - 15)
      setY({ y: scrollCount })
    }
    if (e.deltaY > 0 && !isBottom()) {
      setScrolLCount(scrollCount + 15)
      setY({ y: scrollCount })
    }
  }

  useEffect(() => {
    const ro = new ResizeObserver(elements => {
      for (let elem of elements) {
        setHeight(elem.contentRect.height)
      }
    })
    ro.observe(viewPortRef.current)
  }, [])

  return (
    <React.Fragment>
      <div
        className="main-container"
        onWheel={onWheel}
        style={{
          top: 0,
          left: 0,
          width: "100%",
          position: "fixed",
          height: "auto",
        }}
      >
        <animated.div
          ref={viewPortRef}
          className="viewport"
          style={{
            // height: "100vh",
            // width: "100vw",
            transform: animProps.y.interpolate(trans),
          }}
        >
          {props.children}
        </animated.div>
      </div>
      <div
        className="scroller"
        onWheel={onWheel}
        style={{
          height: contentHeight,
        }}
      />
    </React.Fragment>
  )
}

export default SmoothScroll
