import React, { Fragment, useState, useEffect, useRef } from "react"
import styled from "styled-components"
import { IoIosArrowRoundDown as ArrowDown } from "react-icons/io"
import PortfolioCarousel from "../components/portfolioCarousel"
import NavBar from "../components/navBar"
import ArrowRight from "../assets/arrow-right-icon.svg"
import { GlobalStyle } from "../styles/globalStyle"
import { animated, useSpring, config } from "react-spring"
import { colors } from "../styles/colors"
import SkillCards from "../components/skillCards"
import { typography } from "../styles/typograhpy"
import landingBackground from "../images/landing-background.png"
// import artlandImage from "../images/artland-landing.png"
import artlandImage from "../images/artland-landing-2.png"
import codepanImage from "../images/codepan-dashboard.png"
import vertraxImage from "../images/vertrax-landing-cropped.png"

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
`

const MainTitle = styled.span`
  font-family: "IBM PLEX Light", sans-serif;
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
  height: auto;
  padding: 5rem 10rem 2.5rem;
`

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
`

const ContactSection = styled.section`
  position: relative;
  display: block;
  width: 100vw;
  height: auto;
  padding: 5rem 10rem 2.5rem;
`

const ContactTitle = styled.h1`
  font-size: ${typography.fontSize.huge};
  font-family: "IBM PLEX Light", sans-serif; 
  z-index: 10;
  &:first-child {
    white-space: nowrap;
    margin-right: 1.6rem;
  }
` 
const QuestionsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 9rem;
  span {
    font-size: 20px;
    margin: 0.8rem 0;
    font-family: "IBM PLEX Light", sans-serif;
    letter-spacing: 0.15em;
  }

`

const ContactForm = styled.form`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 400px;
  float: right;
  margin-right: 20%;
  margin-top: 10rem;
  
`

const TextInput = styled.input`
  margin-bottom: 3.2rem;
  height: 50px;
  border: 0;
  border-bottom: 1px solid black;
  background: transparent;
  &::placeholder {
    font-size: 32px;
  }
`

const TextArea = styled.textarea`
  border: 0;
  border-bottom: 1px solid black;
  margin-bottom: 2rem;
  background: transparent;
  &::placeholder {
    font-size: 32px;
  }
`

const SubmitButton = styled.button`
  border: 0;
  width: auto;
  background: transparent;
  text-align: right;
  cursor: pointer;
  font-weight: ${typography.bold};
  padding: 0;
  color: ${colors.black};
  text-decoration: none;
`

const PurpleRect = styled.div`
  position: absolute;
  width: 500px;
  height: 100vh;
  left: 250px;
  top: 0;
  z-index: 0;
  background: rgba(117, 16, 247, 0.5);
  filter: blur(100px);
  transform: rotate(45deg);
`

const SmallRect = styled.div`
  position: absolute;
  width: 701px;
  height: 514px;
  left: 822px;
  top: 314px;
  background: #EDDEF3;
  mix-blend-mode: normal;
  filter: blur(30px);
`

const Triangle = styled.div`
  position: absolute;
  width: 547px;
  height: 547px;
  left: 643px;
  top: 503px;

  background: rgba(155, 234, 239, 0.75);
  filter: blur(10px);
`

const ContactTitleWrapper = styled.div`
  display: flex;
  flex-wrap: nowrap;
  z-index: 10;
`

const IndexPage = () => {
  const scrollTranslatorRef = useRef()
  const [isLocked, setIsLocked] = useState(false)
  const [viewPortHeight, setViewPortHeight] = useState(window.innerHeight)
  const [viewPortWidth, setViewPortWidth] = useState(window.innerWidth)
  const [contactRequest, setContactRequest] = useState({
    name: "",
    message: ""
  })

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

  const handleInputChange = (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault()
    console.log(e)
    // setContactRequest({
    //   []
    //   ...contactRequest
    // })
  }

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
                transform: animProps.x.interpolate(horizontalTrans),
              }}
            >
              <PortfolioCarousel.PortfolioCard
                title="Artland"
                description="Artland is a social platform for art collectors and galleries. Their mission is lowering the barrier of getting into art field through digitalization."
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
                description="Artland is a social platform for art collectors and galleries. Their mission is lowering the barrier of getting into art field through digitalization."
                imageData={codepanImage}
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
                title="Vertrax"
                description="Vertrax is a new platform to track your backcountry ski challenges."
                imageData={vertraxImage}
                stack={["React", "TypeScript", "GraphQL", "Prisma", "NestJS", "Postgresql"]}
              />
            </PortfolioCarousel>
          </WorksSection>
          <SkillsSection>
            <NavBar title="skills." type="default" />
            <SkillsContentWrapper>
              <p>
              As a highly visual and people-centric person, my approach to software development comes via users 
              - always having the UX in mind when making decisions. I shine in filling the gap in communication between users, designers and developers - transforming ideas into beautiful web experiences.
              I'm quietly confident, naturally curious, and perpetually working on improving my chops one technical challenge at a time.
              </p>
              <SkillCards />
            </SkillsContentWrapper>
          </SkillsSection>
          <ContactSection>
            <Triangle/>
            <SmallRect/>
            <PurpleRect/>
            <NavBar type="default" />
            <QuestionsWrapper>
              <span>Have an idea that needs a MVP?</span>
              <span>Have a bunch of new features, and lacking a resource?</span>
              <span>In transition to TypeScript, and need help in converting your project?</span>
            </QuestionsWrapper>
            <ContactTitleWrapper>
              <ContactTitle>Let’s Create Something</ContactTitle><ContactTitle style={{ textDecoration: 'underline' }}>Together</ContactTitle>
            </ContactTitleWrapper>
            <ContactForm>
              <TextInput 
                type="text" 
                placeholder="Enter your name..."
                name="name"
                // onChange={e => setContactRequest({...contactRequest, name: e.target.value })}
                onChange={handleInputChange}
              />
              {/* <TextInput type="email" placeholder="Enter your email..." /> */}
              <TextArea 
                onChange={e => setContactRequest({...contactRequest, message: e.target.value })}
                placeholder="Write your message..." 
              />
                <SubmitButton 
                  as="a" 
                  href={`mailto:sampo.lahtinen@icloud.com?subject=Contact request from ${contactRequest.name}&body=${contactRequest.message}`}
                >
                  Send <ArrowRight />
                </SubmitButton>
            </ContactForm>
          </ContactSection>
        </ScrollTranslator>
      </MainContainerFixed>
      <Scroller className="scroller" />
    </Fragment>
  )
}

export default IndexPage
