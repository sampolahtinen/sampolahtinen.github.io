import React from "react"
import styled from "styled-components"
import { colors } from "../styles/colors"
import MenuIcon from "../assets/menu-icon.svg"
import ArrowRight from "../assets/arrow-right-icon.svg"
import { dimensions } from "../styles/dimensions"

interface NavBarProps {
  section?: string
  title?: string
  type: string;
}

const Container = styled.div`
  position: relative;
  display: flex;
  height: ${`${dimensions.navBarHeight}px`};
  flex-wrap: nowrap;
  align-items: center;
  justify-content: space-between;
  background-color: transparent;
  padding: 0 10rem;
`

const Title = styled.span`
  position: relative;
  color: ${colors.black};
  font-size: 32px;
  font-weight: 100;
`

const SeeAllWrapper = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  span {
    margin-right: 8px;
    font-size: 16px;
  }
`

const StyledMenuIcon = styled(MenuIcon)`
  cursor: pointer;
`

const NavBar = ({ title, section, type }: NavBarProps) => {
  return (
    <Container>
      <Title>{title}</Title>
      {type === 'default' 
        ? (<MenuIcon style={{ cursor: 'pointer' }} />) 
        : (
          <SeeAllWrapper>
            <span>see all</span>
            <ArrowRight />
          </SeeAllWrapper>
        )
      }
    </Container>
  )
}

NavBar.MenuIcon = StyledMenuIcon

export default NavBar
