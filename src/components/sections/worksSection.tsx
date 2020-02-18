import React from 'react';
import NavBar from '../navBar';
import { colors } from '../../styles/colors';
import PortfolioCarousel from '../portfolioCarousel';
import styled from 'styled-components';

// import artlandImage from "../images/artland-landing.png"
import artlandImage from "../../images/artland-landing-2.png"
import codepanImage from "../../images/codepan-dashboard.png"
import vertraxImage from "../../images/vertrax-landing-cropped.png"

interface WorksSectionProps {
  transform: string
}

const WorksSection: React.FC<WorksSectionProps> = ({ transform }) => {
  return (
    <WorksSectionWrapper className="works-section">
      <NavBar title="works." type="works" />
      <MainTitle
        style={{
          fontSize: "50vh",
          fontWeight: 600,
          color: colors.pink,
          opacity: 0.1,
          position: "absolute",
          bottom: 0,
          right: 0,
        }}
      >
        SAMPO
      </MainTitle>
      <PortfolioCarousel
        style={{
          transform,
        }}
      >
        <PortfolioCarousel.PortfolioCard
          title="Artland"
          description="Artland is a social platform for art collectors and galleries. Their mission is lowering the barrier of getting into art field through digitalization."
          tasks="I had a full ownership of bringing the first version of the front-end MPV into productions. My biggest learning from this project was how to iterate designs ideas and prototype these - try and fail fast."
          imageData={artlandImage}
          stack={[
            "React",
            "GraphQL",
            "TypeScript",
            "Nodejs",
            "Nextjs",
            "Prisma",
          ]}
        />
        <PortfolioCarousel.PortfolioCard
          title="Streem.ai"
          description="Streem.ai is developing an anomaly detection platform using unsupervised machine learning techniques."
          tasks="I designed and built a web dashboard, powered by D3, to display the results of a machine learning pipeline. This project was all about learning how to connect a React frontend and Node backend to a ETL-pipeline. "
          imageData={codepanImage}
          stack={[
            "React",
            "Redux",
            "D3",
            "TypeScript",
            "Nodejs",
            "Postgresql",
            "Express",
          ]}
        />
        <PortfolioCarousel.PortfolioCard
          title="Vertrax"
          description="Vertrax is a new platform to track your backcountry ski challenges."
          tasks="My area of responsibility has been on shipping a user invitation system. This project has been a fantastic playground to step into the world of hyped NestJS framework."
          imageData={vertraxImage}
          stack={["React", "TypeScript", "GraphQL", "Prisma", "NestJS", "Postgresql"]}
        />
      </PortfolioCarousel>
    </WorksSectionWrapper>
  )
};

const WorksSectionWrapper = styled.section`
  position: relative;
  background-color: white;
  width: 100vw;
  height: 100vh;
`

const MainTitle = styled.span`
  font-family: "IBM PLEX Light", sans-serif;
  font-size: 100px;
  color: ${colors.black};
  display: block;
  margin-bottom: 48px;
`

export default WorksSection;
