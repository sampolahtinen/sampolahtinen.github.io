import React, { useState, useRef, Ref, useEffect } from 'react';
import NavBar from '../navBar';
import { colors } from '../../styles/colors';
import PortfolioCarousel from '../portfolioCarousel';
import styled from 'styled-components';

// import artlandImage from "../images/artland-landing.png"
import artlandImage from "../../images/artland-landing-2.png"
import codepanImage from "../../images/codepan-dashboard.png"
import vertraxImage from "../../images/vertrax-landing-cropped.png"
import PortfolioCard from '../portfolioCard';

interface WorksSectionProps {
  transform?: string
}

export const calcDynamicHeight = objectWidth => {
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  return objectWidth - vw + vh + 150;
};


export const handleDynamicHeight = (ref, setDynamicHeight) => {
  if (ref) {
    const objectWidth = ref.current.scrollWidth;
    const dynamicHeight = calcDynamicHeight(objectWidth);
    setDynamicHeight(dynamicHeight);
  }
};

export const applyScrollListener = (ref, setTranslateX) => {
  if (ref) {
    window.addEventListener("scroll", () => {
      const offsetTop = -ref.current.offsetTop;
      setTranslateX(offsetTop);
    });
  }
};

const WorksSection = React.forwardRef((props: WorksSectionProps, ref: any) => {
  const { transform  } = props;
  const [dynamicHeight, setDynamicHeight] = useState(null);
  const carouselRef = useRef(null);
  const stickyContainerRef = useRef(null);
  const [translateX, setTranslateX] = useState(0);

  const resizeHandler = () => {
    handleDynamicHeight(carouselRef, setDynamicHeight);
  };

  useEffect(() => {
    handleDynamicHeight(carouselRef, setDynamicHeight);
    window.addEventListener("resize", resizeHandler);
    applyScrollListener(stickyContainerRef, setTranslateX);
  }, []);

  return (
    <WorksSectionWrapper className="works-section">
      <TallContainer height={dynamicHeight}>
        <StickyContainer ref={stickyContainerRef} className="sticky-container">
          <PositionAbsoluteWrapper>
            <NavBar title="works." type="works" />
          </PositionAbsoluteWrapper>
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
            ref={carouselRef}
            style={{
              transform: `translateX(${translateX}px)`
            }}
          >
            <PortfolioCard
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
            <PortfolioCard
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
            <PortfolioCard
              title="Vertrax"
              description="Vertrax is a new platform to track your backcountry ski challenges."
              tasks="My area of responsibility has been on shipping a user invitation system. This project has been a fantastic playground to step into the world of hyped NestJS framework."
              imageData={vertraxImage}
              stack={["React", "TypeScript", "GraphQL", "Prisma", "NestJS", "Postgresql"]}
            />
          </PortfolioCarousel>
        </StickyContainer>
      </TallContainer>>
    </WorksSectionWrapper>
  )
});

const WorksSectionWrapper = styled.section`
  position: relative;
  width: 100%;
  min-height: 100vh;
  padding: 0;

`

const TallContainer = styled.div<{height: number}>`
  position: relative;
  width: 100vw;
  height: ${props => props.height}px;
`

const MainTitle = styled.span`
  font-family: "IBM PLEX Light", sans-serif;
  font-size: 100px;
  color: ${colors.black};
  display: block;
  margin-bottom: 48px;
`

const StickyContainer = styled.div`
  position: sticky;
  top: 0;
  height: 100vh;
  width: 100vw;
  overflow-x: hidden;
`;

const PositionAbsoluteWrapper = styled.div`
  position: absolute;
  top: 0;
  height: 100vh;
  width: 100vw;
  padding: 0 10rem;
`;

export default WorksSection;
