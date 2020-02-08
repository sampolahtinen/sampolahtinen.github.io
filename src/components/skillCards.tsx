import React from "react"
import styled from "styled-components"
import { colors } from "../styles/colors"
import IconPicker from "./IconPicker"
import { typography } from "../styles/typograhpy"

interface SkillCardsProps {
}

const Container = styled.div`
  position: relative;
  width: auto;
`

const SkillCard = styled.div`
  width: 585px;
  height: 602px;
  background: ${colors.white};
  box-shadow: 50px 10px 50px rgba(0, 0, 0, 0.25);
  border-radius: 25px;
`

const SkillCards = ({ title }: SkillCardsProps) => {
  return (
    <Container>
      <SkillCard />
      <SkillCard />
    </Container>
  )
}

export default SkillCards
