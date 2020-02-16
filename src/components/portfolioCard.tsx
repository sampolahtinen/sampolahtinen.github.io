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
  ref?: any
}

const Card = styled.div`
  position: relative;
  width: 100vw;
  height: calc(100vh - 100px);
`

const FlexWrapper = styled.div`
  display: flex;
  flex-wrap: nowrap;
`

const Title = styled.h1`
  margin: 0;
  color: ${colors.black};
  font-family: "IBM PLEX Light", sans-serif;
  font-weight: ${typography.light};
  font-size: ${typography.fontSize.huge};
`

const DescriptionText = styled.p`
  font-size: 1.6rem;
  font-weight: ${typography.light};
  width: 100%;
  max-width: 500px;
  line-height: 1.6em;
  margin-bottom: 1.6em;
  letter-spacing: 0.15em;
  white-space: normal;
  margin: 32px 0;
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
  width: 750px;
  height: 750px;
  padding: 0;
  margin-right: 10rem;
  box-shadow: 20px 30px 50px rgba(94, 94, 94, 0.5);
  background: linear-gradient(
      0deg,
      rgba(232, 187, 251, 0.8),
      rgba(232, 187, 251, 0.8)
    ),
    url(${props => props.imageData});
  background-origin: border-box;
  background-blend-mode: hard-light, normal;
  background-size: cover;
  background-position: top left;
  background-repeat: no-repeat;
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
              <h2 style={{ fontWeight: 500 }}>Stack:</h2>
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
