import React, { useRef, useState, useEffect } from "react"
import styled, { css } from "styled-components"
import { colors } from "../styles/colors"
import IconPicker from "./IconPicker"
import { typography } from "../styles/typograhpy"
import { useSpring, config, animated } from "react-spring"

interface SkillCardsProps {
}

const Container = styled.div`
  position: relative;
  display: flex;
  width: auto;
  transform-style: preserve-3d;
`

const SkillCard = styled(animated.div)<{ pos: string }>`
  width: 585px;
  height: 602px;
  background: ${colors.white};
  position: relative;
  will-change: transform;
  transition: all 300ms;
  transform-style: preserve-3d;
  box-shadow: 50px 10px 50px rgba(0, 0, 0, 0.25);
  border-radius: 25px;
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
      <SkillCard 
        className="backend"
        ref={skillCardRef}
        pos={positions.backend}
        style={{ 
          position: 'absolute',
          background: colors.pink,
          transform: positions.backend === 'front' ? 'translate3d(0px, 0px, 0px)' : `translate3d(${backCardOffset}px, 0px,-100px)` 
        }} 
       />
      <SkillCard 
        className="frontend" 
        pos={positions.frontend} 
        style={{ transform: positions.frontend === 'front' ? 'translate3d(0px, 0px,0px)' : `translate3d(${backCardOffset}px, 0px,-100px)` }} 

      />
    </Container>
  )
}

export default SkillCards
