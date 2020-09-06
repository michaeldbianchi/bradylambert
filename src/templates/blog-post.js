// @jsx jsx
import React from 'react'
import { Link as GatsbyLink, graphql } from 'gatsby'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import Layout from '../components/layout'
import { ArrowLeft, ArrowRight } from 'react-feather'
import { jsx, Box, Button, Container, Flex, Heading, Text } from 'theme-ui'
import ButtonIcon from '../components/button-icon'

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
      <Container variant="article">
        <article>
          <header>
            <Heading as="h1">{post.frontmatter.title}</Heading>
            <Text sx={{ fontSize: 16 }}>{post.frontmatter.date}</Text>
          </header>
          <Box as={MDXRenderer}>{post.body}</Box>
        </article>
        <Flex
          as="nav"
          sx={{
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 4,
            mt: 8
          }}
        >
          {postPrev && (
            <ButtonIcon
              as={GatsbyLink}
              to={postPrev.fields.slug}
              variant="outline"
              icon={ArrowLeft}
            >
              {postPrev.frontmatter.title}
            </ButtonIcon>
          )}
          {postNext && (
            <ButtonIcon
              as={GatsbyLink}
              to={postNext.fields.slug}
              variant="outline"
              icon={ArrowRight}
              iconPosition="right"
              sx={{ ...(!postPrev && { ml: 'auto' }) }}
            >
              {postNext.frontmatter.title}
            </ButtonIcon>
          )}
        </Flex>
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
