import React, {
  Fragment,
  useState,
  ReactChildren,
  ReactChild,
  ReactFragment,
  ReactPortal,
} from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import { createGlobalStyle } from "styled-components"

import Header from "./header"
import "./layout.css"
import { ReactElement } from "react"

type ReactNode =
  | ReactChild
  | ReactFragment
  | ReactPortal
  | boolean
  | null
  | undefined

type LayoutProps = {
  children: ReactNode
}

export const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=VT323&display=swap');
  html {
    font-size: 62.5%;
  }
  body {
    color: ${props => (props.theme === "purple" ? "purple" : "white")};
  }
`

const Layout = ({ children }: LayoutProps): ReactElement => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <Fragment>
      <GlobalStyle />
      <div
        style={{
          margin: `0 auto`,
          maxWidth: 960,
          padding: `0px 1.0875rem 1.45rem`,
          paddingTop: 0,
        }}
      >
        <main>{children}</main>
        <footer>© {new Date().getFullYear()} Sampo Lahtinen</footer>
      </div>
    </Fragment>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
