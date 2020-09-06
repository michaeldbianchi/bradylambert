// @jsx jsx
import React from 'react'
import { graphql, useStaticQuery, Link as GatsbyLink } from 'gatsby'
import GatsbyImage from 'gatsby-image'
import { constrain } from '../utils/mixins'

import SEO from '../components/seo'
import {
  jsx,
  Box,
  Button,
  Flex,
  Grid,
  Link,
  NavLink,
  useThemeUI
} from 'theme-ui'

const Layout = ({ pageSEO = {}, children }) => {
  const data = useStaticQuery(query)
  const { author, social, navLinks } = data.site.siteMetadata
  const { theme } = useThemeUI()
  const constrainRange = [4, 6]

  return (
    <>
      <SEO {...pageSEO} />
      <Grid
        gap={8}
        sx={{
          minHeight: '100vh',
          gridTemplateAreas: "'header' 'main' 'footer'",
          gridTemplateRows: 'auto 1fr auto'
        }}
      >
        <Flex
          as="header"
          sx={{
            bg: 'teal.1',
            px: constrain(...constrainRange),
            py: 4,
            gridArea: 'header',
            justifyContent: 'space-between',
            columnGap: 4,
            borderBottom: '1px solid',
            borderColor: 'gray.4'
          }}
        >
          <Flex
            as="nav"
            sx={{
              columnGap: 8,
              alignItems: 'center'
            }}
          >
            {navLinks.map(({ name, path }) => (
              <NavLink
                key={name}
                as={GatsbyLink}
                to={path}
                partiallyActive={path !== '/'}
                activeStyle={theme.buttons.active}
              >
                {name}
              </NavLink>
            ))}
          </Flex>
          <GatsbyImage
            fixed={data.avatar.childImageSharp.fixed}
            alt={author}
            imgStyle={{
              borderRadius: `50%`,
              minWidth: '50px'
            }}
          />
        </Flex>
        <Box
          as="main"
          gridArea="main"
          sx={{
            mx: constrain(...constrainRange)
          }}
        >
          {children}
        </Box>
        <Box
          as="footer"
          gridArea="footer"
          sx={{
            bg: 'purple.1',
            px: constrain(...constrainRange),
            py: 4,
            textAlign: 'center',
            borderTop: '1px solid',
            borderColor: 'purple.2'
          }}
        >
          {`© ${new Date().getFullYear()} ${author}. Find him on`}
          {` `}
          <Link href={social.github} isExternal>
            Github
          </Link>
          {`!`}
        </Box>
      </Grid>
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
