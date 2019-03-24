import React from "react"
import { useStaticQuery, graphql } from "gatsby"

const TagsList = () => {
  const data = useStaticQuery(graphql`
    query TagsListQuery {
      allMarkdownRemark {
        group(field: frontmatter___tag) {
          fieldValue
          totalCount
        }
      }
    }
  `)

  console.log("data", data)

  return (
    <div>
      {data.allMarkdownRemark.group.map((item, index) => {
        return <div>{item.fieldValue}</div>
      })}
    </div>
  )
}
export default TagsList
