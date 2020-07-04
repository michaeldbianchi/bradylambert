import React from "react"
import { Link, graphql } from "gatsby"
import "../semantic-ui/semantic.less"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { Card, Container } from "semantic-ui-react"

class Home extends React.Component {
  render() {
    const { data } = this.props
    const posts = data.allMarkdownRemark.edges
    console.log(this.props.location)
    return (
      <Layout pageSEO={{ title: "Home" }}>
        <Bio />
        <Card.Group centered>
          {posts.map(({ node: post }) => {
            return (
              <Card as={Link} to={post.fields.slug}>
                <Card.Content
                  header={post.frontmatter.title || post.fields.slug}
                  meta={post.frontmatter.date}
                  description={post.frontmatter.description || post.excerpt}
                />
              </Card>
            )
          })}
        </Card.Group>
      </Layout>
    )
  }
}

export default Home

export const pageQuery = graphql`
  query {
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
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
