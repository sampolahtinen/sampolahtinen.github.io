import React from "react"
import { Group } from "@vx/group"
import { Treemap } from "@vx/hierarchy"
import { hierarchy, stratify, treemapSquarify } from "d3-hierarchy"
import { shakespeare } from "@vx/mock-data"
import { scaleLinear } from "@vx/scale"
import skillData from "../data/skillData"
import { colors } from "../styles/colors"

const blue = "#0373d9"
const green = "#00ff70"
const bg = "#3436b8"

const colorScale = scaleLinear({
  domain: [0, Math.max(...shakespeare.map(d => d.size || 0))],
  range: [blue, green],
})

// const data = stratify()
//   .id(d => d.id)
//   .parentId(d => d.parent)(shakespeare)
//   .sum(d => d.size || 0)

console.log(skillData)

const SkillTreeMap = ({
  width = 600,
  height = 600,
  margin = {
    top: 0,
    left: 30,
    right: 40,
    bottom: 80,
  },
}) => {
  const yMax = height - margin.top - margin.bottom
  const root = hierarchy(skillData)
    .eachBefore(
      (d: any) =>
        (d.data.id = (d.parent ? d.parent.data.id + "." : "") + d.data.name)
    )
    .sum((d: any) => d.size)
    .sort((a, b) => b.height - a.height || b.value - a.value)

  console.log(root)

  return (
    <svg width={width} height={height}>
      <rect width={width} height={height} rx={14} fill="transparent" />
      <Treemap
        root={root}
        size={[width, yMax]}
        tile={treemapSquarify}
        round={true}
      >
        {treemap => {
          const nodes = treemap.descendants().reverse()
          return (
            <Group top={margin.top}>
              {nodes.map((node, i) => {
                console.log(node)
                const width = node.x1 - node.x0
                const height = node.y1 - node.y0
                return (
                  <Group key={`treemap-node-${i}`} top={node.y0} left={node.x0}>
                    {/* {node.depth == 1 && (
                      <rect
                        width={width}
                        height={height}
                        stroke={'white'}
                        strokeWidth={4}
                        fill={"transparent"}
                      />
                    )} */}
                    {node.depth > 2 && (
                      <rect
                        width={width}
                        height={height}
                        stroke={"black"}
                        // fill={colorScale(node.value)}
                        strokeWidth={4}
                        rx={20}
                        style={{
                          padding: "8px",
                        }}
                        fill="transparent"
                      />
                    )}
                    <text
                      x={12}
                      y={20}
                      clipPath={`url(#clip-${i})`}
                      style={{
                        font: "20px Roboto sans-serif",
                      }}
                    >
                      {node.data.name}
                    </text>
                  </Group>
                )
              })}
            </Group>
          )
        }}
      </Treemap>
    </svg>
  )
}

export default SkillTreeMap
