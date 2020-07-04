const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  const blogPost = path.resolve(`./src/templates/blog-post.js`)
  return graphql(
    `
      {
        allMarkdownRemark(
          filter: { fields: { sourceInstanceName: { eq: "blog" } } }
          sort: { fields: [frontmatter___date], order: DESC }
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
    `
  ).then(result => {
    if (result.errors) {
      throw result.errors
    }

    // Create blog posts pages.
    const posts = result.data.allMarkdownRemark.edges

    posts.forEach((post, index) => {
      const postPrev = index === posts.length - 1 ? null : posts[index + 1].node
      const postNext = index === 0 ? null : posts[index - 1].node

      createPage({
        path: post.node.fields.slug,
        component: blogPost,
        context: {
          slug: post.node.fields.slug,
          postPrev,
          postNext
        }
      })
    })

    return null
  })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions
  const sourceInstanceName = "blog"
  if (
    node.internal.type === "MarkdownRemark" &&
    node.parent !== null &&
    getNode(node.parent).sourceInstanceName === sourceInstanceName
  ) {
    const relativePath = createFilePath({
      node,
      getNode,
      trailingSlash: false
    })
    createNodeField({
      node,
      name: "slug",
      value: `/${sourceInstanceName}${relativePath}`
    })
    createNodeField({
      node,
      name: "sourceInstanceName",
      value: sourceInstanceName
    })
  }
}

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      alias: {
        "../../theme.config$": path.join(
          __dirname,
          "src/semantic-ui/theme.config"
        )
      }
    }
  })
}
