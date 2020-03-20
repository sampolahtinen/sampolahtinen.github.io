import React, { Fragment } from "react"
import styled from "styled-components"
import { GlobalStyle } from "../styles/globalStyle"
import ContactSection from "../components/sections/contactSection"
import SkillsSection from "../components/sections/skillsSection"
import WorksSection from "../components/sections/worksSection"
import LandingSection from "../components/sections/landingSection"

const IndexPage = () => {
  return (
    <Fragment>
      <GlobalStyle />
      <MainContainer>
        <LandingSection />
        <WorksSection />
        <SkillsSection />
        <ContactSection />
      </MainContainer>
    </Fragment>
  )
}

const MainContainer = styled.div`
  position: relative;
  display: block;
  width: 100%;
`

export default IndexPage
