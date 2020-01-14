import React from "react"
import styled from "styled-components"
import PortfolioCard from "./portfolioCard"
import { animated } from "react-spring"

const Carousel = styled.div`
  position: relative;
  width: 100vw;
  height: auto;
  background-color: #0e0e11;
`
const Viewer = styled(animated.div)`
  width: calc(3 * 100vw);
  height: 100vh;
  white-space: nowrap;
  will-change: transform;
  z-index: 2;
`

const Portrait = styled.img`
  width: 800px;
  /* width: 100px; */
  height: auto;
  z-index: 0;
  position: absolute;
  top: 0;
  left: 70%;
  opacity: 0.8;
  float: right;
`

const PortfolioCarousel = ({ style }) => {
  console.log(style)
  return (
    <Carousel className="project-carousel">
      <Portrait src={"../../sampo.jpg"} />
      <Viewer className="carousel-viewer" style={style}>
        <PortfolioCard
          title="Artland"
          description="Artland is a social platform for art collectors and galleries. Their mission is lowering the barrier of getting into art field through digitalization."
          imageData={"../../artland-landing.png"}
          stack={[
            "React",
            "GraphQL",
            "TypeScript",
            "Nodejs",
            "Nextjs",
            "Prisma",
          ]}
        />
        <PortfolioCard
          title="Streem.ai"
          description="Artland is a social platform for art collectors and galleries. Their mission is lowering the barrier of getting into art field through digitalization."
          imageData={"../../codepan-dashboard.png"}
          stack={[
            "React",
            "Redux",
            "TypeScript",
            "Nodejs",
            "Postgresql",
            "Express",
          ]}
        />
        <PortfolioCard
          title="Artland"
          description="Artland is a social platform for art collectors and galleries. Their mission is lowering the barrier of getting into art field through digitalization."
          imageData={"../../artland-landing.png"}
          stack={["React", "GraphQL", "Prisma"]}
        />
      </Viewer>
    </Carousel>
  )
}

export default PortfolioCarousel
