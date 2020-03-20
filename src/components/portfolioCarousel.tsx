import React from "react"
import styled from "styled-components"
import { animated } from "react-spring"

const Carousel = styled(animated.div)`
  width: calc(3 * 100vw);
  height: 100%;
  position: absolute;
  white-space: nowrap;
  will-change: transform;
  z-index: 2;
  padding-left: 10rem;
  padding-top: 15rem;
  overflow-y: hidden;
`

const Viewer = styled(animated.div)`
  position: relative;
  height: 100%;
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: center;
`

const PortfolioCarousel = React.forwardRef((props: any, ref: any) => {
  const {  style, children } = props
  return (
    <Carousel ref={ref} className="carousel" style={style}>
      <Viewer>
        {children}
      </Viewer>
    </Carousel>
  )
});

export default PortfolioCarousel
