import React, { useState } from 'react';
import { Triangle, SmallRect, PurpleRect, QuestionsWrapper, ContactTitleWrapper, ContactTitle, ContactForm, TextInput, TextArea, SubmitButton, ContactSectionWrapper } from './contactSection.styles';
import ArrowRight from "../assets/arrow-right-icon.svg"

import NavBar from '../navBar';

const ContactSection: React.FC = () => {
  const [contactRequest, setContactRequest] = useState({
    name: "",
    message: ""
  })
  const handleNameChange = (event: React.FormEvent<HTMLInputElement>)  => setContactRequest({...contactRequest, name: event.currentTarget.value })
  const handleMessageChange =  (event: React.FormEvent<HTMLInputElement>) => setContactRequest({...contactRequest, message: event.currentTarget.value })

  return (
    <ContactSectionWrapper>
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
          onChange={handleNameChange}
        />
        {/* <TextInput type="email" placeholder="Enter your email..." /> */}
        <TextArea 
          onChange={handleMessageChange}
          placeholder="Write your message..." 
        />
          <SubmitButton 
            as="a" 
            href={`mailto:sampo.lahtinen@icloud.com?subject=Contact request from ${contactRequest.name}&body=${contactRequest.message}`}
          >
            Contact <ArrowRight />
          </SubmitButton>
        </ContactForm>
      </ContactSectionWrapper>
  )
};

export default ContactSection;
