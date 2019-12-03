import React from "react"
import { Link } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"

const AboutPage = () => (
  <Layout>
    <SEO title="About" />
    <h1>
      I am an enthusiastic full-stack developer. My approach to developing comes
      via usability and great user interface design. I shine in filling the gap
      in communication between users, designers and developers - transforming
      ideas into beautiful web experiences.
    </h1>
    {/* <Link to="/">Go back to the homepage</Link> */}
  </Layout>
)

export default AboutPage
