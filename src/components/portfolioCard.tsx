import React from "react"
import styled from "styled-components"
import { colors } from "../styles/colors"
import { typography } from "../styles/typograhpy"
import SkillTag from "./SkillTag"
import { lighten } from "polished"

type PortfolioCardProps = {
  title: string
  description: string
  imageData: string
  altText?: string
  stack?: string[]
  ref?: any
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
  color: ${colors.black};
  font-family: "IBM PLEX Light", sans-serif;
  font-weight: ${typography.light};
  font-size: ${typography.fontSize.huge};
  font-family: "Varela", sans-serif;
  padding-bottom: 0.4em;
`

const DescriptionText = styled.p`
  font-size: 1.6rem;
  font-weight: ${typography.light};
  width: 100%;
  max-width: 500px;
  line-height: 1.6em;
  margin-bottom: 1.6em;
  letter-spacing: 2px;
  white-space: normal;
`

const Container = styled.div`
  width: 50%;
  background: white;
  border-radius: 16px;
  margin-left: 50px;
  padding-left: 10rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex-wrap: wrap;
  background: transparent;
`

const ImageContainer = styled.div<Partial<PortfolioCardProps>>`
  width: 900px;
  height: 900px;
  margin-right: 10rem;
  box-shadow: 0px 10px 50px rgba(94, 94, 94, 0.25);
  background: linear-gradient(
      0deg,
      rgba(232, 187, 251, 0.8),
      rgba(232, 187, 251, 0.8)
    ),
    url(${props => props.imageData});
  background-blend-mode: hard-light, normal;
  background-size: cover;
`

const Stack = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 500px;
`

const PortfolioCard: React.FC<PortfolioCardProps> = ({
  title,
  description,
  imageData,
  altText,
  stack,
  ref,
}) => {
  return (
    <Card className="portfolio-card">
      <FlexWrapper>
        <Container>
          <Title>{title}</Title>
          <DescriptionText>{description}</DescriptionText>
          {stack && (
            <>
              <h2>Stack</h2>
              <Stack>
                {stack.map((skill: string) => (
                  <SkillTag key={skill} title={skill} />
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
