/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it

const path = require("path")
const { createFilePath, createFileNode } = require(`gatsby-source-filesystem`)
exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions
  return new Promise((resolve, reject) => {
    resolve(
      graphql(`
        {
          allMarkdownRemark(
            sort: { order: DESC, fields: [frontmatter___date] }
            limit: 1000
          ) {
            edges {
              node {
                fields {
                  slug
                }
                frontmatter {
                  title
                }
              }
            }
          }
        }
      `).then(result => {
        if (result.errors) {
          console.log(result.errors)
          return reject(result.errors)
        }

        const blogTemplate = path.resolve("./src/templates/blog-post.js")
        const listTemplate = path.resolve("./src/templates/post-list.js")
        const POSTS_PER_PAGE = 10
        const SLUG = "/page"

        createPage({
          path: "/",
          component: listTemplate,
          context: {
            skip: 0,
            pageNumber: 1,
          }, // additional data can be passed via context
        })

        result.data.allMarkdownRemark.edges.forEach(({ node }, index) => {
          console.log("node.field.slug", node.fields.slug)
          createPage({
            path: node.fields.slug,
            component: blogTemplate,
            context: {
              slug: node.fields.slug,
            }, // additional data can be passed via context
          })

          if ((index + 1) % POSTS_PER_PAGE === 1) {
            const pageNumber = (index % POSTS_PER_PAGE) + 1
            createPage({
              path: SLUG + `/${pageNumber}`,
              component: listTemplate,
              context: {
                skip: index,
                pageNumber: pageNumber,
              }, // additional data can be passed via context
            })
            console.log("CREATING PAGINATION PAGE")
          }
        })
        return
      })
    )
  })
}

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions
  if (node.internal.type === `MarkdownRemark`) {
    const slug = createFilePath({ node, getNode, basePath: `pages` })
    createNodeField({
      node,
      name: `slug`,
      value: slug,
    })
  }
}
