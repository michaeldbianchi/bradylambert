import React from "react"
import { Link, graphql } from "gatsby"
import { MDXRenderer } from "gatsby-plugin-mdx"

import Layout from "../components/layout"
import {
  Button,
  Container,
  Divider,
  Header,
  Icon,
  Segment
} from "semantic-ui-react"

const BlogPostTemplate = props => {
  const post = props.data.mdx
  const { postPrev, postNext } = props.pageContext
  const postButtonProps = {
    as: Link,
    basic: true,
    color: "teal",
    size: "tiny"
  }

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
          <Header.Subheader color="teal">
            {post.frontmatter.date}
          </Header.Subheader>
        </Header>
        <Divider hidden />
        <MDXRenderer>{post.body}</MDXRenderer>
        <Divider section />
        <Segment basic clearing style={{ padding: 0 }}>
          {postPrev && (
            <Button
              {...postButtonProps}
              floated="left"
              to={postPrev.fields.slug}
            >
              <Icon name="arrow left" />
              {postPrev.frontmatter.title}
            </Button>
          )}
          {postNext && (
            <Button
              {...postButtonProps}
              floated="right"
              to={postNext.fields.slug}
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
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        description
        title
      }
    }
  }
`
