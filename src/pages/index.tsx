import React, { Fragment, useState, useEffect, useRef, useLayoutEffect } from "react"
import styled from "styled-components"
import { GlobalStyle } from "../styles/globalStyle"
import { animated, useSpring, config } from "react-spring"
import ContactSection from "../components/sections/contactSection"
import SkillsSection from "../components/sections/skillsSection"
import WorksSection from "../components/sections/worksSection"
import LandingSection from "../components/sections/landingSection"

const IndexPage = () => {
  const scrollTranslatorRef = useRef()
  const [isLocked, setIsLocked] = useState(false)
  const [viewPortHeight, setViewPortHeight] = useState(window.innerHeight)
  const [viewPortWidth, setViewPortWidth] = useState(window.innerWidth)
  const [contentHeight, setContentHeight] = useState(0)

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
    onFrame: (props: any) => {
      if (isLocked || Math.floor(props.y) === viewPortHeight) {
        console.log("stopping")
        stopAnimation()
      }
    },
  })) as any

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

  useLayoutEffect(() => {
    const carouselWidth =  2 * window.innerWidth
    const totalHeight = 4 * window.innerHeight + carouselWidth + 200
    setContentHeight(totalHeight)
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
          <LandingSection />
          <WorksSection transform={animProps.x.interpolate(horizontalTrans)} />
          <SkillsSection />
          <ContactSection />
        </ScrollTranslator>
      </MainContainerFixed>
      <Scroller className="scroller" height={contentHeight}/>
    </Fragment>
  )
}

const MainContainerFixed = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
`

const Scroller = styled.div<{height: number}>`
  width: 100%;
  height: ${props => props.height + 'px'};
`

const ScrollTranslator = styled(animated.div)`
  width: 100vw;
  height: 100vh;
  will-change: transform;
`

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

export default IndexPage
