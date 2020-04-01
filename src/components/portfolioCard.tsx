import React from "react"
import styled from "styled-components"
import { colors } from "../styles/colors"
import { typography } from "../styles/typograhpy"
import SkillTag from "./skillTag"
import { breakpoints } from "../styles/breakpoints"

interface PortfolioCardProps {
  title: string
  description: string
  tasks?: string
  imageData: string
  stack?: string[]
}

const PortfolioCard: React.FC<PortfolioCardProps> = ({
  title,
  description,
  tasks,
  imageData,
  stack,
}) => {
  return (
    <Card className="portfolio-card">
      <FlexWrapper>
        <Container>
          <div style={{ minHeight: '250px' }}>
            <Title>{title}</Title>
            <DescriptionText>{description}</DescriptionText>
            <DescriptionText>{tasks}</DescriptionText>
          </div>
          {stack && (
            <StackContainer className="stack-wrapper">
              <StackTitle>Stack:</StackTitle>
              <Stack>
                {stack.map((skill: string) => (
                  <SkillTag key={skill} title={skill} />
                ))}
              </Stack>
            </StackContainer>
          )}
        </Container>
        <ImageContainer imageData={imageData} />
      </FlexWrapper>
    </Card>
  )
}

const Card = styled.div`
  position: relative;
  width: 100vw;
  height: calc(100vh - 100px);
`

const StackContainer = styled.div`
  @media screen and (max-width: ${breakpoints.phone}) {
    margin: 1rem 0;
  }
`

const FlexWrapper = styled.div`
  display: flex;
  flex-wrap: nowrap;
  @media screen and (max-width: ${breakpoints.phone}) {
    padding: 1rem;
    flex-wrap: wrap; 
    flex-direction: column;
    align-items: center;
  }
`

const Title = styled.h1`
  margin: 0;
  color: ${colors.black};
  font-family: "IBM PLEX Light", sans-serif;
  font-weight: ${typography.light};
  font-size: ${typography.fontSize.huge};
  @media screen and (max-width: ${breakpoints.phone}) {
    margin-bottom: 1rem;
    font-size: ${typography.fontSize.normal};
    font-weight: ${typography.bold}
  }
`

const StackTitle = styled.h2`
  font-weight: 500;
  @media screen and (max-width: ${breakpoints.phone}) {
    font-size: ${typography.fontSize.tiny};
    margin-bottom: 0.5rem;
  }
`

const DescriptionText = styled.p`
  font-size: 1.6rem;
  font-weight: ${typography.light};
  width: 100%;
  max-width: 500px;
  line-height: 1.6em;
  letter-spacing: 0.15em;
  white-space: normal;
  margin: 1.6rem 0;
  @media screen and (max-width: ${breakpoints.phone}) {
    max-width: 100%;
    font-size: 12px;
    margin: 0;
    margin-bottom: 1rem;
  }
`

const Container = styled.div`
  width: 50%;
  background: white;
  border-radius: 16px;
  margin-left: 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex-wrap: wrap;
  background: transparent;
  @media screen and (max-width: ${breakpoints.phone}) {
    width: 100%;
    font-size: 12px;
    margin: 0;
  }
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
  @media screen and (max-width: ${breakpoints.phone}) {
    width: 100%;
    height: 300px;
    margin-right: 0;
  }
`

const Stack = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 500px;
  @media screen and (max-width: ${breakpoints.phone}) {
    width: 100%;
  }
`

export default PortfolioCard
