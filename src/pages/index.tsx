import React, { Fragment, useState, useEffect, useRef } from "react"
import styled, { css } from "styled-components"
import { IoIosArrowRoundDown as ArrowDown } from "react-icons/io"
import SkillTreeMap from "../components/skillTreeMap"
import PortfolioCarousel from "../components/portfolioCarousel"
import NavBar from "../components/navBar"

import landingBackground from "../images/landing-background.png"
import { GlobalStyle } from "../styles/globalStyle"
import { animated, useSpring, config } from "react-spring"
import { colors } from "../styles/colors"

const LandingArea = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  background-color: hsl(227, 16%, 17%);
  background-image: url(${landingBackground});
  background-size: cover;
  display: flex;
  align-items: center;
  /* justify-content: center; */
  flex-wrap: wrap;
  z-index: 1;
`

const MainTitle = styled.span`
  font-family: "IBM PLEX Light", sans-serif;
  /* font-weight: lighter; */
  /* text-transform: uppercase; */
  font-size: 100px;
  color: ${colors.black};
  display: block;
  margin-bottom: 48px;
`

const SubTitle = styled.span`
  font-family: "IBM PLEX Light", sans-serif;
  font-weight: 100;
  color: ${colors.black};
  font-size: 48px;
  margin: 2rem 0;
  display: block;
`

const TextWrapper = styled.div`
  margin-left: 10rem;
  width: auto;
  z-index: 4;
`

const CommonLine = styled.hr`
  display: inline-block;
  border: 1px solid white;
  background: white;
  width: 30px;
  margin: 0 16px 0 0;
`

const FlexWrapper = styled.div`
  display: flex;
  align-items: center;
`

const BigArrowDown = styled(ArrowDown)`
  position: absolute;
  bottom: 50px;
  color: hsl(0, 0%, 45%);
`

const MainContainerFixed = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
`

const Scroller = styled.div`
  width: 100%;
  height: 10000px;
`

const ScrollTranslator = styled(animated.div)`
  width: 100vw;
  height: 100vh;
  will-change: transform;
`

const WorksSection = styled.section`
  position: relative;
  background-color: white;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
`

const SkillsSection = styled.section`
  display: block;
  background-color: white;
  width: 100vw;
  height: 100vh;
  padding: 5rem 10rem 2.5rem;
`

const IndexPage = () => {
  const scrollTranslatorRef = useRef()
  const [isLocked, setIsLocked] = useState(false)
  const [viewPortHeight, setViewPortHeight] = useState(window.innerHeight)
  const [viewPortWidth, setViewPortWidth] = useState(window.innerWidth)

  const worksRef = useRef(null)

  // UTILS
  const trans = (y: number) => `translate3d(0px, -${y}px,0px)`
  const horizontalTrans = (x: number) => `translate3d(-${x}px, 0px,0px)`
  const addVerticalScroll = callback =>
    window.addEventListener("scroll", callback)

  const [animProps, setAnimProps, stopAnimation] = useSpring(() => ({
    immediate: false,
    y: 0,
    x: 0,
    config: {
      ...config.slow,
      clamp: true,
      precision: 1,
    },
    onFrame: props => {
      if (isLocked || Math.floor(props.y) === viewPortHeight) {
        console.log("stopping")
        stopAnimation()
      }
    },
  })) as any

  // useLayoutEffect(() => {
  //   const worksSection = worksRef.current
  //   const observer = new IntersectionObserver(
  //     function(entries) {
  //       if (entries[0].isIntersecting === true) {
  //         setIsLocked(true)
  //       }
  //     },
  //     { threshold: [0.99] }
  //   )
  //   observer.observe(worksSection)
  // }, [])

  // useLayoutEffect(() => {
  //   const lastCard = document.getElementsByClassName("portfolio-card")[2]
  //   const lastObserver = new IntersectionObserver(
  //     function(entries) {
  //       if (entries[0].isIntersecting === true && scrollDirection === "down") {
  //         setIsLocked(false)
  //       }
  //     },
  //     { threshold: [0.8] }
  //   )
  //   lastObserver.observe(lastCard)
  // }, [])

  const handleVerticalScrolling = (e: Event) => {
    e.preventDefault()
    const scrollPos = Math.floor(animProps.y.value + animProps.x.value)

    switch (true) {
      case scrollPos < viewPortHeight:
        setIsLocked(false)
        setAnimProps({ ...animProps, y: window.scrollY })
        break
      case scrollPos >= viewPortHeight &&
        scrollPos < 2 * viewPortWidth + viewPortHeight:
        setIsLocked(true)
        setAnimProps({ ...animProps, x: window.scrollY - animProps.y.value })
        break
      case scrollPos > 2 * viewPortWidth + viewPortHeight:
        setIsLocked(false)
        setAnimProps({ ...animProps, y: window.scrollY - animProps.x.value })
        break
      default:
        break
    }
  }

  useEffect(() => {
    const setViewPortSizes = () => {
      setViewPortHeight(window.innerHeight)
      setViewPortWidth(window.innerWidth)
    }
    window.addEventListener("resize", setViewPortSizes)
    return () => {
      window.removeEventListener("resize", setViewPortSizes)
    }
  }, [])

  useEffect(() => {
    addVerticalScroll(handleVerticalScrolling)
    return () => {
      window.removeEventListener("scroll", handleVerticalScrolling)
    }
  }, [handleVerticalScrolling])

  return (
    <Fragment>
      <GlobalStyle />
      <MainContainerFixed>
        <ScrollTranslator
          ref={scrollTranslatorRef}
          className="scroll-translator"
          style={{
            transform: isLocked
              ? `translate3d(0px, ${viewPortHeight}, 0px)`
              : animProps.y.interpolate(trans),
          }}
        >
          <LandingArea className="landing-area">
            <TextWrapper>
              <MainTitle>Hi! I'm Sampo,</MainTitle>
              <SubTitle>an enthusiastic full stack developer,</SubTitle>
              <SubTitle>who brings your ideas into production.</SubTitle>
            </TextWrapper>
            <BigArrowDown width={500} height={300} />
          </LandingArea>
          <WorksSection ref={worksRef} className="works-section">
            {/* <div
              style={{
                paddingTop: "5rem",
                paddingLeft: "10rem",
                paddingBottom: "2.5rem",
              }}
            >
              <h1>works.</h1>
            </div> */}
            <NavBar title="works." />
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
                transform: animProps.x.interpolate(horizontalTrans),
              }}
            >
              <PortfolioCarousel.PortfolioCard
                title="Artland"
                description="Artland is a social platform for art collectors and galleries. Their mission is lowering the barrier of getting into art field through digitalization."
                imageData={"../../artland-landing.png"}
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
                description="Artland is a social platform for art collectors and galleries. Their mission is lowering the barrier of getting into art field through digitalization."
                imageData={"../../codepan-dashboard.png"}
                stack={[
                  "React",
                  "Redux",
                  "TypeScript",
                  "Nodejs",
                  "Postgresql",
                  "Express",
                ]}
              />
              <PortfolioCarousel.PortfolioCard
                title="Artland"
                description="Artland is a social platform for art collectors and galleries. Their mission is lowering the barrier of getting into art field through digitalization."
                imageData={"../../artland-landing.png"}
                stack={["React", "GraphQL", "Prisma"]}
              />
            </PortfolioCarousel>
          </WorksSection>
          <SkillsSection>
            <h1>skills.</h1>
            <div>
              <SkillTreeMap
                width={viewPortWidth * 0.8}
                height={viewPortHeight * 0.5}
              />
            </div>
          </SkillsSection>
        </ScrollTranslator>
      </MainContainerFixed>
      <Scroller className="scroller" />
    </Fragment>
  )
}

export default IndexPage
