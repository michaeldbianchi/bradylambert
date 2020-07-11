import React from "react"
import { Link, graphql } from "gatsby"
import { MDXRenderer } from "gatsby-plugin-mdx"

import Layout from "../components/layout"
import {
  Button,
  Divider,
  Header,
  Icon,
  Segment,
  Container
} from "semantic-ui-react"

const BlogPostTemplate = props => {
  const post = props.data.mdx
  const { postPrev, postNext } = props.pageContext

  return (
    <Layout
      pageSEO={{
        title: post.frontmatter.title,
        description: post.frontmatter.description || post.excerpt
      }}
    >
      <Container text>
        <Header as="h1">
          {post.frontmatter.title}
          <Header.Subheader as="h2" color="teal">
            {post.frontmatter.date}
          </Header.Subheader>
        </Header>
        <Divider hidden />
        <MDXRenderer>{post.body}</MDXRenderer>
        <Divider section />
        <Segment basic clearing style={{ paddingBottom: 0, paddingTop: 0 }}>
          {postPrev && (
            <Button
              as={Link}
              to={postPrev.fields.slug}
              basic
              color="teal"
              floated="left"
              size="tiny"
            >
              <Icon name="arrow left" />
              {postPrev.frontmatter.title}
            </Button>
          )}
          {postNext && (
            <Button
              as={Link}
              to={postNext.fields.slug}
              basic
              color="teal"
              floated="right"
              size="tiny"
            >
              {postNext.frontmatter.title}
              <Icon name="arrow right" />
            </Button>
          )}
        </Segment>
      </Container>
    </Layout>
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    mdx(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      body
      exports {
        metadata {
          title
          date(formatString: "MMMM DD, YYYY")
          description
        }
      }
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
      }
    }
  }
`
