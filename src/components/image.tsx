import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"
import styled from "styled-components"

type ImageProps = {
  style?: React.CSSProperties
}

const RotatedImage = styled(Img)`
  /* transform: rotate(-45deg) translate(-25%, -50%); */
`
const Image = ({ style }: ImageProps) => {
  const data = useStaticQuery(graphql`
    query {
      file(relativePath: { eq: "code.png" }) {
        childImageSharp {
          # Specify a fixed image and fragment.
          # The default width is 400 pixels
          fixed(width: 1900) {
            ...GatsbyImageSharpFixed
          }
        }
      }
    }
  `)

  return (
    <RotatedImage
      fixed={data.file.childImageSharp.fixed}
      alt="Gatsby Docs are awesome"
      style={style}
    />
  )
}

export default Image
