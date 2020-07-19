import React from "react"
import { Link, graphql } from "gatsby"
import "../semantic-ui/semantic.less"

import Layout from "../components/layout"
import { Card, Label } from "semantic-ui-react"

const HomePage = props => {
  const posts = props.data.allMdx.nodes

  return (
    <Layout pageSEO={{ title: "Home" }}>
      <Card.Group centered itemsPerRow="3" stackable>
        {posts.map(post => (
          <Card key={post.id} as={Link} to={post.fields.slug}>
            <Label
              corner
              icon={post.frontmatter.categoryLinked.icon}
              color={post.frontmatter.categoryLinked.color}
            />
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
      nodes {
        id
        excerpt
        fields {
          slug
        }
        frontmatter {
          categoryLinked {
            icon
            color
          }
          date(formatString: "MMMM DD, YYYY")
          description
          title
        }
      }
    }
  }
`
