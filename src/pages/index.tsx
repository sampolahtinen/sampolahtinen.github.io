import React, {
  Fragment,
  useState,
  useEffect,
  useRef,
  useLayoutEffect,
} from "react"
import styled from "styled-components"
import { IoIosArrowRoundDown as ArrowDown } from "react-icons/io"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"
import PortfolioCarousel from "../components/portfolioCarousel"

import codeImage from "../images/code.png"
import { useScroller } from "../utils/useeScroller"
import { GlobalStyle } from "../styles/globalStyle"
import { animated, useSpring, config } from "react-spring"

const LandingArea = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  background-color: hsl(227, 16%, 17%);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  /* margin-bottom: 500px; */
  z-index: 1;
  /* transition: transform 300ms ease-out; */
  /* will-change: transform; */
`

const RotatedContainer = styled.div<{ width: number }>`
  position: absolute;
  bottom: 100px;
  display: block;
  width: ${props => props.width + "px"};
  height: ${props => props.width + "px"};
  transform: rotate(45deg);
  border: 1px solid white;
  overflow: hidden;
`

const Background = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-image: url(${codeImage});
  background-size: cover;
  /* z-index: 2; */
  transition: all 500ms ease-out;
  /* filter: blur(1px); */
`

const MainTitle = styled.span`
  font-family: "VT323", monospace;
  text-transform: uppercase;
  font-size: 68px;
  color: white;
  display: block;
  margin-bottom: 48px;
`

const SubTitle = styled.span`
  font-family: "VT323", monospace;
  font-size: 32px;
  color: white;
`

const TextWrapper = styled.div`
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
  height: 2rem;
  width: 2rem;
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
  background-color: #0e0e11;
  width: 100vw;
  height: 100vh;
`

const SkillsSection = styled.section`
  display: block;
  background-color: blue;
  width: 100vw;
  height: 100vh;
`

const IndexPage = () => {
  const scrollTranslatorRef = useRef()
  const [isHorizontalActive, setIsHorizontalActive] = useState(false)
  const [isVerticalActive, setIsVerticalActive] = useState(false)
  const [isLastProjectVisible, setIsLastProjectVisible] = useState(false)
  const [savedPositions, savePosition] = useState([])
  const [scrollDirection, setScrollDirection] = useState("down")
  const [squareWidth, setSquareWidth] = useState(100)
  const viewPortHeight = window.innerHeight
  const viewPortWidth = window.outerWidth

  const [clipPoints, setClipPoints] = useState({
    p1: [50, 80],
    p2: [55, 85],
    p3: [50, 90],
    p4: [45, 85],
  })

  const worksRef = useRef(null)

  // UTILS
  const trans = (y: number) => `translate3d(0px, -${y}px,0px)`

  const horizontalTrans = (x: number) => `translate3d(-${x}px, 0px,0px)`

  const addVerticalScroll = callback => {
    console.log("added vertical scroll")
    window.addEventListener("scroll", callback)
  }

  const addHorizontalScroll = callback => {
    console.log("added horizontal scroll")
    window.addEventListener("scroll", callback)
  }

  const [animProps, setAnimProps, stopAnimation] = useSpring(() => ({
    immediate: false,
    y: 0,
    x: 0,
    config: {
      ...config.slow,
      clamp: true,
    },
    onStart: key => {
      if (key.fromValues[0] > window.scrollY) {
        setScrollDirection("up")
      } else {
        setScrollDirection("down")
      }
    },
  }))

  // useLayoutEffect(() => {
  //   const worksSection = worksRef.current
  //   const observer = new IntersectionObserver(
  //     function(entries) {
  //       if (entries[0].isIntersecting === true) {
  //         setIsHorizontalActive(true)
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
  //       if (entries[0].isIntersecting === true) {
  //         setIsLastProjectVisible(true)
  //         console.log("last card intersecting")
  //       } else {
  //         setIsLastProjectVisible(false)
  //         console.log("last card not intersecting")
  //       }
  //     },
  //     { threshold: [0.8] }
  //   )
  //   lastObserver.observe(lastCard)
  // }, [])

  const handleVerticalScrolling = (e: Event) => {
    e.preventDefault()
    const scrollPos = Math.ceil(animProps.y.value + animProps.x.value)

    switch (true) {
      case scrollPos < viewPortHeight:
        setAnimProps({ y: window.scrollY })
        break
      case scrollPos >= viewPortHeight && scrollPos < 2 * viewPortWidth:
        setAnimProps({ x: window.scrollY - animProps.y.value })
        break
      case scrollPos >= 2 * viewPortWidth:
        setAnimProps({ y: window.scrollY - animProps.x.value })
        break
      default:
        break
    }

    // if (isLastProjectVisible)

    // const target = e.currentTarget as Window
    // const scrollYPosition = target.scrollY
    // const nextValue = squareWidth + scrollYPosition * 3.5
    // setSquareWidth(nextValue)
    // setPolygonShape(drawRhombus(scrollYPosition / 100))
    // const nextClipPoints = {
    //   ...clipPoints,
    //   p1: [
    //     clipPoints.p1[0] - scrollYPosition / 5,
    //     clipPoints.p1[1] - scrollYPosition / 5,
    //   ],
    //   p2: [
    //     clipPoints.p2[0] + scrollYPosition / 5,
    //     clipPoints.p1[1] - scrollYPosition / 5,
    //   ],
    //   p3: [
    //     clipPoints.p3[0] + scrollYPosition / 5,
    //     clipPoints.p3[1] + scrollYPosition / 5,
    //   ],
    //   p4: [
    //     clipPoints.p4[0] - scrollYPosition / 5,
    //     clipPoints.p4[1] + scrollYPosition / 5,
    //   ],
    // }
    // setClipPoints(nextClipPoints)
    // setScrollPosition(scrollYPosition)
  }

  useEffect(() => {
    addVerticalScroll(handleVerticalScrolling)
    return () => {
      window.removeEventListener("scroll", handleVerticalScrolling)
    }
  }, [handleVerticalScrolling])

  const drawClipPath = (points: any) => {
    return `polygon(${points.p1[0]}% ${points.p1[1]}%, ${points.p2[0]}% ${points.p2[1]}%, ${points.p3[0]}% ${points.p3[1]}%, ${points.p4[0]}% ${points.p4[1]}%)`
  }

  return (
    <Fragment>
      <GlobalStyle />
      <MainContainerFixed>
        <ScrollTranslator
          ref={scrollTranslatorRef}
          className="scroll-translator"
          style={{
            transform: animProps.y.interpolate(trans),
          }}
          // style={{
          //   transform: isHorizontalActive
          //     ? `translate3d(0px,-${savedPositions[0]}px, 0px)`
          //     : animProps.y.interpolate(trans),
          // }}
        >
          <LandingArea
            className="landing-area"
            // style={{
            //   transform: `translate3d(0px,${scrollPosition}px, 0px)`,
            // }}
          >
            <TextWrapper>
              <MainTitle>Hi! I'm Sampo,</MainTitle>
              <MainTitle>an enthusiastic full stack developer</MainTitle>
              <FlexWrapper>
                <CommonLine />
                <SubTitle>creating from scratch to production.</SubTitle>
              </FlexWrapper>
            </TextWrapper>
            {/* <Background
              className="code-background"
              style={{
                clipPath: drawClipPath(clipPoints),
              }}
            /> */}
            <RotatedContainer width={squareWidth}>
              <Image
              // style={{
              //   transform: `rotate(-45deg) translate3d(-25%,${-1000 +
              //     animProps.y.value}px, 0px)`,
              // }}
              />
            </RotatedContainer>
            <BigArrowDown />
          </LandingArea>
          <WorksSection ref={worksRef}>
            <div
              style={{
                paddingTop: "5rem",
                paddingLeft: "10rem",
                paddingBottom: "2.5rem",
              }}
            >
              <h1>works.</h1>
            </div>
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
                // ref={lastPortfolioCardRef}
                title="Artland"
                description="Artland is a social platform for art collectors and galleries. Their mission is lowering the barrier of getting into art field through digitalization."
                imageData={"../../artland-landing.png"}
                stack={["React", "GraphQL", "Prisma"]}
              />
            </PortfolioCarousel>
          </WorksSection>
          <SkillsSection>
            <div
              style={{
                paddingTop: "5rem",
                paddingLeft: "10rem",
                paddingBottom: "2.5rem",
              }}
            >
              <h1>skills.</h1>
            </div>
          </SkillsSection>
        </ScrollTranslator>
      </MainContainerFixed>
      <Scroller className="scroller" />
    </Fragment>
  )
}

export default IndexPage
