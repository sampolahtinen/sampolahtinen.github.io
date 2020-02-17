import styled from "styled-components"

import { typography } from "../../styles/typograhpy"

import { colors } from "../../styles/colors"

export const ContactSectionWrapper = styled.section``

export const ContactTitle = styled.h1`
  font-size: ${typography.fontSize.huge};
  font-family: "IBM PLEX Light", sans-serif; 
  z-index: 10;
  &:first-child {
    white-space: nowrap;
    margin-right: 1.6rem;
  }
` 
export const QuestionsWrapper = styled.div`
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

export const ContactForm = styled.form`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 400px;
  float: right;
  margin-right: 20%;
  margin-top: 10rem;
  
`

export const TextInput = styled.input`
  margin-bottom: 3.2rem;
  height: 50px;
  border: 0;
  border-bottom: 1px solid black;
  background: transparent;
  &::placeholder {
    font-size: 32px;
  }
`

export const TextArea = styled.textarea`
  border: 0;
  border-bottom: 1px solid black;
  margin-bottom: 2rem;
  background: transparent;
  &::placeholder {
    font-size: 32px;
  }
`

export const SubmitButton = styled.button`
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

export const PurpleRect = styled.div`
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

export const SmallRect = styled.div`
  position: absolute;
  width: 701px;
  height: 514px;
  left: 822px;
  top: 314px;
  background: #EDDEF3;
  mix-blend-mode: normal;
  filter: blur(30px);
`

export const Triangle = styled.div`
  position: absolute;
  width: 547px;
  height: 547px;
  left: 643px;
  top: 503px;

  background: rgba(155, 234, 239, 0.75);
  filter: blur(10px);
`

export const ContactTitleWrapper = styled.div`
  display: flex;
  flex-wrap: nowrap;
  z-index: 10;
`