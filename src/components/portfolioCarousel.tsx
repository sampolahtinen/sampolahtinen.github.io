import React from "react"
import styled from "styled-components"
import { colors } from "../styles/colors"
import Img from "gatsby-image"
import { graphql, useStaticQuery } from "gatsby"
import PortfolioCard from "./portfolioCard"

const Carousel = styled.div`
  position: relative;
  overflow: hidden;
  width: 100vw;
  height: 100vh;
`
const Viewer = styled.div`
  width: auto;
  height: inherit;
`

const PortfolioCarousel = ({}) => {
  const artlandImage = useStaticQuery(graphql`
    query {
      file(relativePath: { eq: "artland-landing.png" }) {
        childImageSharp {
          # Specify a fixed image and fragment.
          # The default width is 400 pixels
          fluid(maxWidth: 800) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `)
  return (
    <Carousel className="project-carousel">
      <Viewer>
        <PortfolioCard
          title="Artland"
          description="lorem lorem lorem lorem"
          imageData={artlandImage.file.childImageSharp.fluid}
        />
        <PortfolioCard
          title="Artland"
          description="lorem lorem lorem lorem"
          imageData={artlandImage.file.childImageSharp.fluid}
        />
        <PortfolioCard
          title="Artland"
          description="lorem lorem lorem lorem"
          imageData={artlandImage.file.childImageSharp.fluid}
        />
      </Viewer>
    </Carousel>
  )
}

export default PortfolioCarousel
