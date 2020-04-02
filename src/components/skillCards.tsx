import React, { useRef, useState, useEffect } from "react"
import styled from "styled-components"
import { colors } from "../styles/colors"
import FrontEndIcon from "../assets/frontend-icon.svg"
import BackEndIcon from "../assets/backend-icon.svg"
import { typography } from "../styles/typograhpy"
import { useSpring, config, animated } from "react-spring"
import { breakpoints } from "../styles/breakpoints"

const SkillCards = () => {
  const skillCardRef = useRef(null)
  const initialState = {
    frontend: 'front',
    backend: 'back',
  }
  
  const [positions, setPositions] = useState(initialState)
  const [backCardOffset, setBackCardOffset] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  
  const handleHover = () => setPositions({
    frontend: 'back',
    backend: 'front'
  })
  
  const handleMouseLeave = () => setPositions(initialState)

  useEffect(() => {
    const cardOffset = skillCardRef?.current.offsetWidth * 0.25 
    setBackCardOffset(cardOffset)

    if (typeof window !== undefined && window.outerWidth <= +breakpoints.phone.replace('px', '')) {
      setIsMobile(true)
    }
  }, [])

  const renderMobile = () => (
    <>
      <SkillCard 
        className="frontend" 
      >
        <FrontEndIcon />
        <h3>Frontend</h3>
        <p className="skill-card-description">I like to code things from scratch, and enjoy bringing ideas to life in the browser.</p>
        <span style={{ marginBottom: '0.8rem'}}>Stack:</span>
        <ul>
          <li>React</li>
          <li>Redux</li>
          <li>Redux-sagas</li>
          <li>React-spring</li>
          <li>Styled Components</li>
          <li>Enzyme/Jest</li>
        </ul>
      </SkillCard>
      <BackendCard 
        className="backend"
        ref={skillCardRef}
       >
        <BackEndIcon />
        <h3>Backend</h3>
        <p className="skill-card-description" style={{ color: colors.white }}>To power up the frontend, below is my chosen backend engine. </p>
        <span>Stack:</span>
        <ul>
          <li>Node.js</li>
          <li>Express.js</li>
          <li>Nest.js</li>
          <li>GraphQL Server</li>
          <li>PostgreSQL</li>
          <li>Prisma</li>
        </ul>
      </BackendCard>
    </>
  )

  const renderDesktop = () => (
    <>
    <BackendCard 
      className="backend"
      ref={skillCardRef}
      style={{ 
        transform: positions.backend === 'front' ? 'translate3d(0px, 0px, 0px)' : `translate3d(${backCardOffset}px, 0px,-100px)` 
      }} 
    >
      <BackEndIcon />
        <h3>Backend</h3>
        <p className="skill-card-description" style={{ color: colors.white }}>To power up the frontend, below is my chosen backend engine. </p>
        <span>Stack:</span>
        <ul>
          <li>Node.js</li>
          <li>Express.js</li>
          <li>Nest.js</li>
          <li>GraphQL Server</li>
          <li>PostgreSQL</li>
          <li>Prisma</li>
        </ul>
      </BackendCard>
      <SkillCard 
        className="frontend" 
        style={{ transform: positions.frontend === 'front' ? 'translate3d(0px, 0px,0px)' : `translate3d(${backCardOffset}px, 0px,-100px)` }} 
      >
        <FrontEndIcon />
        <h3>Frontend</h3>
        <p className="skill-card-description">I like to code things from scratch, and enjoy bringing ideas to life in the browser.</p>
        <span style={{ marginBottom: '0.8rem'}}>Stack:</span>
        <ul>
          <li>React</li>
          <li>Redux</li>
          <li>Redux-sagas</li>
          <li>React-spring</li>
          <li>Styled Components</li>
          <li>Enzyme/Jest</li>
        </ul>
      </SkillCard>
    </>
  )

  return (
    <Container
      onMouseEnter={handleHover} 
      onMouseLeave={handleMouseLeave} 
    >
      {isMobile ?  renderMobile() : renderDesktop()}
    </Container>
  )
}

const Container = styled.div`
  position: relative;
  display: flex;
  width: auto;
  transform-style: preserve-3d;
  z-index: 10;
  @media screen and (max-width: ${breakpoints.phone}) {
    display: block;
  }
`

const SkillCard = styled(animated.div)`
  width: 585px;
  height: 602px;
  background: ${colors.white};
  position: relative;
  will-change: transform;
  transition: all 300ms;
  transform-style: preserve-3d;
  box-shadow: 50px 10px 50px rgba(0, 0, 0, 0.25);
  border-radius: 25px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2em;
  z-index: 10;
  .skill-card-description {
    font-size: 16px;
    margin: 2rem 0;
    max-width: 400px;
    line-height: 20px;
  }
  ul {
    margin: 0;
  }
  h3 {
    font-size: 32px;
  }
  span {
    color: ${colors.purple};
    font-weight: 500;
    font-family: "IBM PLEX Bold", sans-serif; 
  }
  li {
    text-align: center;
    margin-top: 0.8rem;
    line-height: 1.5;
    font-weight: ${typography.light};
    font-family: "IBM PLEX Light", sans-serif; 
  }
  svg {
    min-height: 117px;
    margin-bottom: 3.2rem;
  }
  @media screen and (max-width: ${breakpoints.phone}) {
    width: 100%;
    height: auto;
    margin-bottom: 1rem;
  }
`

const BackendCard = styled(SkillCard)`
  position: absolute;
  color: ${colors.white};
  box-shadow: 0px 10px 50px rgba(94, 94, 94, 0.25);
  background-image: linear-gradient( 135deg, #43CBFF 10%, #9708CC 100%);
  svg {
    min-height: 150px;
    margin-bottom: 0;
  }
  @media screen and (max-width: ${breakpoints.phone}) {
    position: relative;
  }
`

export default SkillCards
