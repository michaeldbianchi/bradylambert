import React from "react"
import { Link, graphql } from "gatsby"
import { MDXRenderer } from "gatsby-plugin-mdx"

import Bio from "../components/bio"
import Layout from "../components/layout"

const BlogPostTemplate = props => {
  const post = props.data.mdx
  const { postPrev, postNext } = props.pageContext
  console.log(post)
  console.log(props.pageContext)

  return (
    <Layout
      pageSEO={{
        title: post.frontmatter.title,
        description: post.frontmatter.description || post.excerpt
      }}
    >
      <h1>{post.frontmatter.title}</h1>
      <p>{post.frontmatter.date}</p>
      <MDXRenderer>{post.body}</MDXRenderer>
      <hr />
      <Bio />

      <ul>
        <li>
          {postPrev && (
            <Link to={postPrev.fields.slug} rel="prev">
              ← {postPrev.frontmatter.title}
            </Link>
          )}
        </li>
        <li>
          {postNext && (
            <Link to={postNext.fields.slug} rel="next">
              {postNext.frontmatter.title} →
            </Link>
          )}
        </li>
      </ul>
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
        title
        date(formatString: "MMMM DD, YYYY")
        description
      }
    }
  }
`
