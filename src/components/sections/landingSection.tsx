import React from 'react';
import styled from 'styled-components';
import { colors } from '../../styles/colors';
import landingBackground from "../../images/landing-background.png"
import { IoIosArrowRoundDown as ArrowDown } from "react-icons/io"
import { breakpoints } from '../../styles/breakpoints';
import { typography } from '../../styles/typograhpy';


const LandingSection = () => {
  return (
    <LandingArea className="landing-area">
      <TextWrapper>
        <MainTitle>Hi! I'm Sampo,</MainTitle>
        <SubTitle>an enthusiastic full stack developer,</SubTitle>
        <SubTitle 
          style={{ transform: window.outerWidth <= 375 ? 'rotate(5deg)' : '' }}
        >
          who brings your ideas into production.
        </SubTitle>
      </TextWrapper>
      <BigArrowDown width={500} height={300} />
    </LandingArea>
  )
};

const LandingArea = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  background-color: hsl(227, 16%, 17%);
  background-image: url(${landingBackground});
  background-size: cover;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  z-index: 1;
  @media screen and (max-width: ${breakpoints.phone}) {
    background-position-x: 50%;
    background-repeat: no-repeat;
  }
`

const MainTitle = styled.span`
  font-family: "IBM PLEX Light", sans-serif;
  font-size: 100px;
  color: ${colors.black};
  display: block;
  margin-bottom: 48px;
  @media screen and (max-width: ${breakpoints.phone}) {
    font-size: ${typography.fontSize.big};
    font-family: "IBM PLEX Light", sans-serif; 
  }
`

const SubTitle = styled.span`
  font-family: "IBM PLEX Light", sans-serif;
  font-weight: 100;
  color: ${colors.black};
  font-size: 48px;
  margin: 2rem 4rem;
  display: block;
  @media screen and (max-width: ${breakpoints.phone}) {
    font-size: 40px;
    margin: 2rem 0rem;
  }
`

const TextWrapper = styled.div`
  margin-left: 10rem;
  width: auto;
  z-index: 4;
  @media screen and (max-width: ${breakpoints.phone}) {
    margin-left: 2rem;
  }
`

const BigArrowDown = styled(ArrowDown)`
  position: absolute;
  bottom: 50px;
  color: hsl(0, 0%, 45%);
`


export default LandingSection;
