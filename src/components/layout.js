import React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"
import { useLocation } from "@reach/router"
import { Container, Menu } from "semantic-ui-react"
import SEO from "../components/seo"

const Layout = ({ pageSEO = {}, children }) => {
  const data = useStaticQuery(query)
  const navLinks = data.site.siteMetadata.navLinks
  const { pathname } = useLocation()

  return (
    <>
      <SEO {...pageSEO} />
      <header>
        <Menu as="nav" compact stackable pointing secondary>
          {navLinks.map(({ name, path }) => (
            <Menu.Item
              key={name}
              as={Link}
              to={path}
              active={path === pathname}
            >
              {name}
            </Menu.Item>
          ))}
        </Menu>
      </header>
      <main>
        <Container>{children}</Container>
      </main>
      <footer>
        © {new Date().getFullYear()}, Built with
        {` `}
        <a href="https://www.gatsbyjs.org">Gatsby</a>
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
