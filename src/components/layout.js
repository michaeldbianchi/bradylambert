import React from "react"
import { useStaticQuery, Link } from "gatsby"
import { useLocation } from "@reach/router"
import {
  Container,
  Divider,
  Grid,
  List,
  Menu,
  Segment
} from "semantic-ui-react"
import SEO from "../components/seo"

const Layout = ({ pageSEO = {}, children }) => {
  const data = useStaticQuery(query)
  const navLinks = data.site.siteMetadata.navLinks
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
              <List items={items} horizontal divided relaxed link />
            </Grid.Row>
            <Grid.Row>
              <span>
                © {new Date().getFullYear()}, Built with
                {` `}
                <a href="https://www.gatsbyjs.org">Gatsby</a>
              </span>
            </Grid.Row>
          </Grid>
        </Segment>
      </footer>
    </>
  )
}

export default Layout

const query = graphql`
  query {
    site {
      siteMetadata {
        navLinks {
          name
          path
        }
      }
    }
  }
`
