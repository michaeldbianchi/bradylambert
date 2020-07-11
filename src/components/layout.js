import React from "react"
import { graphql, useStaticQuery, Link } from "gatsby"
import Img from "gatsby-image"
import { useLocation } from "@reach/router"
import { Container, Grid, List, Menu, Segment } from "semantic-ui-react"
import SEO from "../components/seo"

const Layout = ({ pageSEO = {}, children }) => {
  const data = useStaticQuery(query)
  const { author, social, navLinks } = data.site.siteMetadata
  const { pathname } = useLocation()
  const items = navLinks.map(({ name, path }) => ({
    as: Link,
    content: name,
    key: name,
    to: path,
    active: path === pathname
  }))

  return (
    <>
      <SEO {...pageSEO} />
      <header>
        <Menu
          as="nav"
          items={items}
          color="teal"
          size="huge"
          compact
          stackable
          pointing
          secondary
        />
        <Segment basic floated="right" vertical>
          <Img
            fixed={data.avatar.childImageSharp.fixed}
            alt={author}
            imgStyle={{
              borderRadius: `50%`
            }}
          />
        </Segment>
      </header>
      <main>
        <Segment basic padded="very">
          <Container>{children}</Container>
        </Segment>
      </main>
      <footer>
        <Segment size="small">
          <Grid container textAlign="center" padded="vertically">
            <Grid.Row>
              <List items={items} centered horizontal divided relaxed link />
            </Grid.Row>
          </Grid>
          <Container textAlign="center">
            {`© ${new Date().getFullYear()} ${author}. Find him on`}
            {` `}
            <a href={social.github}>Github</a>
            {`!`}
          </Container>
        </Segment>
      </footer>
    </>
  )
}

export default Layout

const query = graphql`
  query {
    avatar: file(relativePath: { eq: "profile-pic.jpg" }) {
      childImageSharp {
        fixed(width: 50, height: 50) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    site {
      siteMetadata {
        author
        navLinks {
          name
          path
        }
        social {
          github
        }
      }
    }
  }
`
