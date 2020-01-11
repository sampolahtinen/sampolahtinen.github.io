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
  width: calc(3 * 100vw);
  height: 100vh;
  white-space: nowrap;
  will-change: transform;
`

const PortfolioCarousel = ({ style }) => {
  console.log(style)
  return (
    <Carousel className="project-carousel">
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
