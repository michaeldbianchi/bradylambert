// @jsx jsx
import React from 'react'
import { Link as GatsbyLink, graphql } from 'gatsby'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import Layout from '../components/layout'
import { ArrowLeft, ArrowRight } from 'react-feather'
import { jsx, Box, Button, Container, Flex, Heading, Text } from 'theme-ui'

const BlogPostTemplate = props => {
  const post = props.data.mdx
  const { postPrev, postNext } = props.pageContext
  const sxButton = {
    flex: 'none',
    display: 'inline-flex',
    columnGap: 3,
    placeItems: 'center',
    px: 4,
    py: 3,
    lineHeight: 1,
    whiteSpace: 'nowrap',
    transition: '.3s all',
    '&:hover': {
      bg: 'teal.5'
    }
  }
  const sxIcon = {
    m: -1,
    width: 5,
    height: 5,
    flex: 'none',
    color: '#fff'
  }

  return (
    <Layout
      pageSEO={{
        title: post.frontmatter.title,
        description: post.frontmatter.description || post.excerpt
      }}
    >
      <Container>
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
            gap: 4
          }}
        >
          {postPrev && (
            <Button
              as={GatsbyLink}
              to={postPrev.fields.slug}
              sx={{ ...sxButton }}
            >
              <Box as={ArrowLeft} sx={{ ...sxIcon }} />
              {postPrev.frontmatter.title}
            </Button>
          )}
          {postNext && (
            <Button
              as={GatsbyLink}
              to={postNext.fields.slug}
              sx={{ ...sxButton, flexDirection: 'row-reverse' }}
            >
              <Box as={ArrowRight} sx={{ ...sxIcon }} />
              {postNext.frontmatter.title}
            </Button>
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
