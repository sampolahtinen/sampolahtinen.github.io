import React from "react"
import styled from "styled-components"
import { colors } from "../styles/colors"
import { typography } from "../styles/typograhpy"
import MenuIcon from "../assets/menu-icon.svg"

interface NavBarProps {
  title: string
}

const Container = styled.div`
  position: relative;
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: space-between;
  background-color: transparent;
  padding: 0.5em 0.5em;
`

const Title = styled.span`
  position: relative;
  color: ${colors.black};
  font-size: ${typography.fontSize.normal};
`

const NavBar = ({ title }: NavBarProps) => {
  return (
    <Container>
      <Title>{title}</Title>
      <MenuIcon />
    </Container>
  )
}

export default NavBar
