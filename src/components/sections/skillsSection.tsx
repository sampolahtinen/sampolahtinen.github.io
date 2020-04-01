import React from 'react';
import NavBar from '../navBar';
import SkillCards from '../skillCards';
import styled from 'styled-components';
import { colors } from '../../styles/colors';
import { typography } from '../../styles/typograhpy';
import { breakpoints } from '../../styles/breakpoints';

const SkillsSection: React.FC = () => {
  return (
    <SkillsSectionWrapper>
      <NavBar title="skills." type="default" />
      <SkillsContentWrapper>
        <p>
          As a highly visual and people-centric person, my approach to software development comes via users. I shine in filling the gap in communication between users, designers and developers - transforming ideas into beautiful web experiences.
          I'm quietly confident, naturally curious, and perpetually working on improving my chops one technical challenge at a time.
        </p>
        <SkillCards />
      </SkillsContentWrapper>
    </SkillsSectionWrapper>
  )
};


const SkillsSectionWrapper = styled.section``

const SkillsContentWrapper = styled.div`
  width: 900px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
  p {
    text-align: center;
    color: ${colors.black};
    font-family: "IBM PLEX Light", sans-serif;
    font-weight: ${typography.light};
    font-size: 20px;
    line-height: 32px;
    margin: 6rem 0;
  }
  @media screen and (max-width: ${breakpoints.phone}) {
    width: 100%;
    p {
      font-size: 16px;
    }
  }
`


export default SkillsSection;
