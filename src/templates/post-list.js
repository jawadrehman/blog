import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

import styled from "@emotion/styled"
import * as moment from "moment"

import { graphql } from "gatsby"

const Title = styled.h2`
  color: darkslategrey;
  margin-bottom: 0px;
`
const Description = styled.p`
  color: #4b054b;
`

const IndexPage = props => {
  const { data, pageContext } = props

  return (
    <Layout>
      <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />

      {data.allMarkdownRemark.edges.map(({ node }, i) => {
        const { date, title, description } = node.frontmatter
        const formattedDate = moment(date).fromNow()
        return (
          <Link to={node.fields.slug} className="link">
            <div className="post-list">
              <Title>{title}</Title>
              <span>{formattedDate}</span>
              <Description>{description}</Description>
            </div>
          </Link>
        )
      })}
      {data.allMarkdownRemark.edges.length === 10 && (
        <Link to={`/page/${pageContext.pageNumber + 1}`}>Next</Link>
      )}
    </Layout>
  )
}

export const query = graphql`
  query PostListQuery($skip: Int!) {
    allMarkdownRemark(
      limit: 10
      skip: $skip
      sort: { order: DESC, fields: frontmatter___date }
    ) {
      edges {
        node {
          frontmatter {
            title
            description
            date
          }
          fields {
            slug
          }
        }
      }
    }
  }
`
export default IndexPage
