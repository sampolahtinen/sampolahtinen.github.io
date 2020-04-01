import React from "react"
import styled from "styled-components"
import { colors } from "../styles/colors"
import IconPicker from "./IconPicker"
import { typography } from "../styles/typograhpy"
import { breakpoints } from "../styles/breakpoints"

interface SkillTagProps {
  title: string
}

const SkillTag = ({ title }: SkillTagProps) => {
  return (
    <Container>
      <IconPicker title={title} />
      <Title>{title}</Title>
    </Container>
  )
}

const Container = styled.div`
  position: relative;
  margin-right: 0.8em;
  margin-bottom: 0.8em;
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  border: 1px solid;
  border-radius: 16px;
  background-color: transparent;
  padding: 0.25em 1em;
`

const Title = styled.span`
  position: relative;
  color: ${colors.black};
  font-size: ${typography.fontSize.small};
  @media screen and (max-width: ${breakpoints.phone}) {
    font-size: 12px;
  }
`

export default SkillTag
