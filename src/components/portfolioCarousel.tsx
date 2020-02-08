import React from "react"
import styled from "styled-components"
import PortfolioCard from "./portfolioCard"
import { animated } from "react-spring"

const Carousel = styled.div`
  position: relative;
  width: 100vw;
  height: auto;
`
const Viewer = styled(animated.div)`
  display: flex;
  width: calc(3 * 100vw);
  height: 100vh;
  white-space: nowrap;
  will-change: transform;
  z-index: 2;
`

const Portrait = styled.img`
  width: 800px;
  height: auto;
  z-index: 0;
  position: absolute;
  top: 0;
  left: 70%;
  opacity: 0.8;
  float: right;
`

const PortfolioCarousel = ({ style, children }) => {
  return (
    <Carousel className="project-carousel">
      <Viewer className="carousel-viewer" style={style}>
        {children}
      </Viewer>
    </Carousel>
  )
}

PortfolioCarousel.PortfolioCard = PortfolioCard

export default PortfolioCarousel
