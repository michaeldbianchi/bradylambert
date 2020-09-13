import PropTypes from 'prop-types'
import { Link as GatsbyLink, graphql } from 'gatsby'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import Layout from '../components/layout'
import { ArrowLeft, ArrowRight } from 'react-feather'
// @jsx jsx
import { jsx, Box, Container, Divider, Flex, Heading, Text } from 'theme-ui'
import ButtonIcon from '../components/button-icon'

function BlogPostTemplate({ data, pageContext }) {
  const post = data.mdx
  const { postPrev, postNext } = pageContext

  return (
    <Layout
      pageSEO={{
        title: post.frontmatter.title,
        description: post.frontmatter.description || post.excerpt
      }}
    >
      <Container
        variant="article"
        sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
      >
        <Box as="article" sx={{ mb: 'auto' }}>
          <Box as="header">
            <Heading as="h1">{post.frontmatter.title}</Heading>
            <Text sx={{ fontSize: 16 }}>{post.frontmatter.date}</Text>
          </Box>
          <Box as={MDXRenderer}>{post.body}</Box>
        </Box>
        <Divider
          sx={{
            my: 6
          }}
        />
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

BlogPostTemplate.propTypes = {
  data: PropTypes.object,
  pageContext: PropTypes.object
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
