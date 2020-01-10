import React from "react"
import styled from "styled-components"
import { colors } from "../styles/colors"
import Img, { FluidObject } from "gatsby-image"
import { typography } from "../styles/typograhpy"
import { DiReact } from "react-icons/di"
import { Icon, InlineIcon } from "@iconify/react"
import graphqlIcon from "@iconify/icons-logos/graphql"
import reactIcon from "@iconify/icons-logos/react"
import reduxIcon from "@iconify/icons-logos/redux"
import nodejsIcon from "@iconify/icons-logos/nodejs-icon"
import nextjsIcon from "@iconify/icons-logos/nextjs"
import prismaIcon from "@iconify/icons-logos/prisma"

interface IconProps {
  title: string
}

const icons = {
  graphql: graphqlIcon,
  nodejs: nodejsIcon,
  react: reactIcon,
  redux: reduxIcon,
  nextjs: nextjsIcon,
  prisma: prismaIcon,
}

const IconPicker = ({ title }: IconProps) => {
  return (
    <Icon
      width="1.8em"
      style={{ marginRight: "0.8em" }}
      icon={icons[title.toLowerCase()]}
    />
  )
}

export default IconPicker
