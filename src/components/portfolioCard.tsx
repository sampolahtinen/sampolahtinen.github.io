import React from "react"
import styled from "styled-components"
import { colors } from "../styles/colors"
import Img, { FluidObject } from "gatsby-image"

const Card = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-wrap: nowrap;
`

const Title = styled.h1`
  color: ${colors.grey};
`

const DescriptionText = styled.p`
  font-size: 1.6rem;
`

const Container = styled.div`
  width: 50%;
`

type PortfolioCardProps = {
  title: string
  description: string
  imageData: FluidObject
  altText?: string
}

const PortfolioCard = ({
  title,
  description,
  imageData,
  altText,
}: PortfolioCardProps) => {
  return (
    <Card>
      <Container>
        <Title>{title}</Title>
        <DescriptionText>{description}</DescriptionText>
      </Container>
      <Container>
        <Img fluid={imageData} alt={altText} />
      </Container>
    </Card>
  )
}

export default PortfolioCard
