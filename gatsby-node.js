const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const blogPost = path.resolve(`./src/templates/blog-post.js`)

  const result = await graphql(`
    {
      allMdx(
        filter: { fields: { sourceInstanceName: { eq: "blog" } } }
        sort: { fields: [frontmatter___date], order: DESC }
        limit: 1000
      ) {
        nodes {
          fields {
            slug
          }
          frontmatter {
            category {
              name
            }
            title
          }
        }
      }
    }
  `)
  // allBlogCategoriesJson {
  //   nodes {
  //     name
  //   }
  // }

  if (result.errors) {
    throw result.errors
  }

  const posts = result.data.allMdx.nodes
  // const categories = result.data.allBlogCategoriesJson.nodes.map(
  //   blogCategory => blogCategory.name
  // )
  posts.forEach((post, index) => {
    const postPrev = index === posts.length - 1 ? null : posts[index + 1]
    const postNext = index === 0 ? null : posts[index - 1]

    // const category = post.frontmatter.category
    // if (category && !categories.includes(category)) {
    //   console.error(
    //     `Frontmatter category for post titled "${post.frontmatter.title}" is not included as a name in allBlogCategoriesJson.`
    //   )
    // }
    if (post.frontmatter.category === null) {
      console.error(
        `Frontmatter category for post titled "${post.frontmatter.title}" is not included as a name in allBlogCategoriesJson.`
      )
    }

    createPage({
      path: post.fields.slug,
      component: blogPost,
      context: {
        slug: post.fields.slug,
        postPrev,
        postNext
      }
    })
  })
}

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions
  const typeDefs = `
    type Mdx implements Node {
      frontmatter: Frontmatter
    }
    type Frontmatter {
      title: String!
      category: BlogCategoriesJson @link(by: "name")
    }
  `
  createTypes(typeDefs)
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions
  const name = "blog"
  if (
    node.internal.type === "Mdx" &&
    node.parent !== null &&
    getNode(node.parent).sourceInstanceName === name
  ) {
    const relativePath = createFilePath({
      node,
      getNode,
      trailingSlash: false
    })
    createNodeField({
      node,
      name: "slug",
      value: `/${name}${relativePath}`
    })
    createNodeField({
      node,
      name: "sourceInstanceName",
      value: name
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
