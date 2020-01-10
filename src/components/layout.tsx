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

import Header from "./header"
import { ReactElement } from "react"
import { GlobalStyle } from "../styles/globalStyle"

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
