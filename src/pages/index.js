import React from "react"
import { Link, graphql } from "gatsby"
import "../semantic-ui/semantic.less"

import Bio from "../components/bio"
import Layout from "../components/layout"
import { Card } from "semantic-ui-react"

const HomePage = ({ data }) => {
  const posts = data.allMdx.edges

  return (
    <Layout pageSEO={{ title: "Home" }}>
      <Bio />
      <Card.Group centered>
        {posts.map(({ node: post }) => (
          <Card key={post.id} as={Link} to={post.fields.slug}>
            <Card.Content
              header={post.frontmatter.title || post.fields.slug}
              meta={post.frontmatter.date}
              description={post.frontmatter.description || post.excerpt}
            />
          </Card>
        ))}
      </Card.Group>
    </Layout>
  )
}

export default HomePage

export const pageQuery = graphql`
  query {
    allMdx(
      filter: { fields: { sourceInstanceName: { eq: "blog" } } }
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      edges {
        node {
          id
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            description
          }
        }
      }
    }
  }
`
