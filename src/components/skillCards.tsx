import React, { useRef, useState, useEffect } from "react"
import styled, { css } from "styled-components"
import { colors } from "../styles/colors"
import FrontEndIcon from "../assets/frontend-icon.svg"
import BackEndIcon from "../assets/backend-icon.svg"
import { typography } from "../styles/typograhpy"
import { useSpring, config, animated } from "react-spring"

interface SkillCardsProps {
}

const Container = styled.div`
  position: relative;
  display: flex;
  width: auto;
  transform-style: preserve-3d;
  z-index: 10;

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
  ul {
    margin: 0;
  }
  h3 {
    font-size: 32px;
  }
  span {
    color: ${colors.purple};
    font-size: 20px;
    font-weight: ${typography.bold};
    margin-bottom: 1.6rem;
  }
  li {
    text-align: center;
    margin: 1.6rem 0;
  }
  svg {
    min-height: 117px;
    margin-bottom: 3.2rem;
  }
`

const BackendCard = styled(SkillCard)`
  position: absolute;
  color: ${colors.white};
  background: linear-gradient(309.27deg, #7510F7 20%, #FFFFFF 116.46%);
  box-shadow: 0px 10px 50px rgba(94, 94, 94, 0.25);
  svg {
    min-height: 150px;
    margin-bottom: 0;
  }
`

const SkillCards = () => {
  const skillCardRef = useRef(null)
  const initialState = {
    frontend: 'front',
    backend: 'back',
  }
  
  const [positions, setPositions] = useState(initialState)
  const [backCardOffset, setBackCardOffset] = useState(0)
  
  const handleHover = () => setPositions({
    frontend: 'back',
    backend: 'front'
  })
  
  const handleMouseLeave = () => setPositions(initialState)

  useEffect(() => {
    const cardOffset = skillCardRef?.current.offsetWidth * 0.25 
    setBackCardOffset(cardOffset)
  }, [])

  return (
    <Container
      onMouseEnter={handleHover} 
      onMouseLeave={handleMouseLeave} 
      style={{
        // Offset the card container for center positioning
        marginLeft: `-${backCardOffset}px`
      }}
    >
      <BackendCard 
        className="backend"
        ref={skillCardRef}
        style={{ 
          transform: positions.backend === 'front' ? 'translate3d(0px, 0px, 0px)' : `translate3d(${backCardOffset}px, 0px,-100px)` 
        }} 
       >
        <BackEndIcon />
        <h3>Backend</h3>
        <p style={{ margin: '2rem 0', color: colors.white }}>To power up the front, here is my chosen engine.</p>
        <span style={{ marginBottom: '0.8rem'}}>Stack:</span>
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
        // pos={positions.frontend} 
        style={{ transform: positions.frontend === 'front' ? 'translate3d(0px, 0px,0px)' : `translate3d(${backCardOffset}px, 0px,-100px)` }} 
      >
        <FrontEndIcon />
        <h3>Frontend</h3>
        <p style={{ margin: '2rem 0'}}>I like to code things from scratch, and enjoy bringing ideas to life in the browser.</p>
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
    </Container>
  )
}

export default SkillCards
