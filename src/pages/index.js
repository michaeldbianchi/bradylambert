import React from 'react'
import PropTypes from 'prop-types'
import { Link as GatsbyLink, graphql } from 'gatsby'
import { Card, Container, Grid, Heading, Link, Text } from 'theme-ui'
import Layout from '../components/layout'

function HomePage({ data }) {
  const posts = data.allMdx.nodes

  return (
    <Layout pageSEO={{ title: 'Home' }}>
      <Container>
        <Grid
          gap={6}
          sx={{
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gridAutoRows: '1fr',
            justifyContent: 'center'
          }}
        >
          {posts.map(post => (
            <Link
              key={post.id}
              as={GatsbyLink}
              to={post.fields.slug}
              sx={{ textDecoration: 'none' }}
            >
              <Card sx={{ height: '100%' }}>
                {/* <Label
              corner
              icon={post.frontmatter.categoryLinked.icon}
              color={post.frontmatter.categoryLinked.color}
            /> */}
                <Heading>{post.frontmatter.title || post.fields.slug}</Heading>
                <Text variant="default" sx={{ color: 'textMuted' }}>
                  {post.frontmatter.date}
                </Text>
                <Text variant="default" sx={{ mt: 1 }}>
                  {post.frontmatter.description || post.excerpt}
                </Text>
              </Card>
            </Link>
          ))}
        </Grid>
      </Container>
    </Layout>
  )
}

HomePage.propTypes = {
  data: PropTypes.object
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
