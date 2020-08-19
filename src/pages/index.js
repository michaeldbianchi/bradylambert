import React from 'react'
import { Link as GatsbyLink, graphql } from 'gatsby'
import Layout from '../components/layout'

import { Card, Heading, Link } from 'theme-ui'

const HomePage = props => {
  const posts = props.data.allMdx.nodes

  return (
    <Layout pageSEO={{ title: 'Home' }}>
      {/* <Card.Group centered itemsPerRow="3" stackable> */}
      {posts.map(post => (
        <Link key={post.id} as={GatsbyLink} to={post.fields.slug}>
          <Card>
            {/* <Label
              corner
              icon={post.frontmatter.categoryLinked.icon}
              color={post.frontmatter.categoryLinked.color}
            /> */}
            {/* <Card.Content */}
            <Heading>{post.frontmatter.title || post.fields.slug}</Heading>
            {/* meta={post.frontmatter.date} */}
            {/* description={post.frontmatter.description || post.excerpt} */}
            {/* /> */}
          </Card>
        </Link>
      ))}
      {/* </Card.Group> */}
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
