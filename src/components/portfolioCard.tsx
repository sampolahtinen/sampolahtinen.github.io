import React from "react"
import styled from "styled-components"
import { colors } from "../styles/colors"
import { typography } from "../styles/typograhpy"
import SkillTag from "./SkillTag"

type PortfolioCardProps = {
  title: string
  description: string
  imageData: string
  altText?: string
  stack?: string[]
}

const Card = styled.div`
  position: relative;
  display: inline-block;
  width: 100vw;
  height: 100vh;
`

const FlexWrapper = styled.div`
  display: flex;
  flex-wrap: nowrap;
`

const Title = styled.h1`
  color: ${colors.white};
  font-weight: ${typography.bold};
  font-size: ${typography.fontSize.huge};
  padding-bottom: 0.4em;
`

const DescriptionText = styled.p`
  font-size: 1.6rem;
  width: 100%;
  max-width: 400px;
  line-height: 1.6em;
  margin-bottom: 1.6em;
  font-weight: 400;
  white-space: normal;
`

const Container = styled.div`
  width: 50%;
  padding-left: 10rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex-wrap: wrap;
`

const ImageContainer = styled.div<Partial<PortfolioCardProps>>`
  width: 50%;
  height: 80vh;
  margin-right: 10rem;
  background-image: url(${props => props.imageData});
  background-size: cover;
`

const Stack = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 500px;
`

const PortfolioCard = ({
  title,
  description,
  imageData,
  altText,
  stack,
}: PortfolioCardProps) => {
  return (
    <Card>
      <FlexWrapper>
        <Container>
          <Title>{title}</Title>
          <DescriptionText>{description}</DescriptionText>
          {stack && (
            <>
              <h2>Stack</h2>
              <Stack>
                {stack.map((skill: string) => (
                  <SkillTag title={skill} />
                ))}
              </Stack>
            </>
          )}
        </Container>
        <ImageContainer imageData={imageData} />
      </FlexWrapper>
    </Card>
  )
}

export default PortfolioCard
