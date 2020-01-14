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
  const [horizontalScrollPosition, setHorizontalScrollPosition] = useState(0)
  const [isHorizontalActive, setIsHorizontalActive] = useState(false)
  const [savedPositions, savePosition] = useState([])
  const [squareWidth, setSquareWidth] = useState(100)
  const viewPortHeight = window.innerHeight

  const [clipPoints, setClipPoints] = useState({
    p1: [50, 80],
    p2: [55, 85],
    p3: [50, 90],
    p4: [45, 85],
  })

  const worksRef = useRef(null)

  // useEffect(() => {
  //   if (isHorizontalActive) {
  //     setHorizontalScrollPosition(horizontalScrollPosition + 1)
  //   }
  // }, [scrollPosition])

  const trans = (y: number) => `translate3d(0px, -${y}px,0px)`
  const horizontalTrans = (x: number) => `translate3d(-${x}px, 0px,0px)`

  const [animProps, setAnimProps, stopScroll] = useSpring(() => ({
    immediate: false,
    y: 0,
    x: 0,
    config: {
      ...config.slow,
      clamp: true,
    },
  }))

  useLayoutEffect(() => {
    const worksSection = worksRef.current
    const observer = new IntersectionObserver(
      function(entries) {
        if (entries[0].isIntersecting === true) {
          console.log("nakyy")
          setIsHorizontalActive(true)
        }
      },
      { threshold: [0.99] }
    )
    observer.observe(worksSection)
  }, [])

  const handleScroll = (e: Event) => {
    e.preventDefault()
    if (animProps.x.value === 0) {
      setAnimProps({ y: window.scrollY })
    } else {
      setAnimProps({ y: window.scrollY - animProps.x.value })
    }
    // setAnimProps({ y: window.scrollY })
    console.log(animProps.y.value)

    // Remove scroll listener while 1 x viewport has been scroller
    if (window.scrollY >= viewPortHeight && savedPositions.length !== 1) {
      console.log("removing vertical scroll")
      savePosition([...savedPositions, window.scrollY])
      window.removeEventListener("scroll", handleScroll)
    }

    // Remove scroll listener while 1 x viewport has been scroller
    // Could you window.scrollY here as well
    // if (Math.floor(animProps.y.value) >= viewPortHeight) {
    //   stopScroll()
    //   window.removeEventListener("scroll", handleScroll)
    // }

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

  const handleHorizontalScroll = () => {
    const currentVerticalPosition = savedPositions[0]
    setAnimProps({ x: window.scrollY - currentVerticalPosition })
    const horizontalPosition = Math.floor(animProps.x.value)
    const carouselWidth = 2 * window.innerWidth

    const val = horizontalPosition === 2 * window.innerWidth

    if (horizontalPosition === 2 * window.innerWidth) {
      window.removeEventListener("scroll", handleHorizontalScroll)
      window.addEventListener("scroll", handleScroll)
      setIsHorizontalActive(false)
    }
  }

  const continueVerticalScroll = () => {
    e.preventDefault()
    setAnimProps({ y: window.scrollY - animProps.x.value })
  }

  useEffect(() => {
    if (!isHorizontalActive) {
      window.addEventListener("scroll", handleScroll)
    }
    if (isHorizontalActive) {
      window.addEventListener("scroll", handleHorizontalScroll)
    }
    // return () => window.removeEventListener("scroll", handleScroll)
  }, [isHorizontalActive])

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
            transform: isHorizontalActive
              ? `translate3d(0px,-${savedPositions[0]}px, 0px)`
              : animProps.y.interpolate(trans),
          }}
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
            />
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
