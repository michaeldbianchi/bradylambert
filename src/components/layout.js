import React from 'react'
import PropTypes from 'prop-types'
import { graphql, useStaticQuery, Link as GatsbyLink } from 'gatsby'
import GatsbyImage from 'gatsby-image'
import { constrain } from '../utils/mixins'
import { Box, Flex, Grid, Link, NavLink, useThemeUI } from 'theme-ui'
import SEO from '../components/seo'

function Layout({ pageSEO = {}, children }) {
  const data = useStaticQuery(query)
  const { author, social, navLinks } = data.site.siteMetadata
  const { theme } = useThemeUI()
  const constrainRange = [4, 6]

  return (
    <React.Fragment>
      <SEO {...pageSEO} />
      <Grid
        gap={10}
        sx={{
          minHeight: '100vh',
          gridTemplateAreas: "'header' 'main' 'footer'",
          gridTemplateRows: 'auto 1fr auto'
        }}
      >
        <Flex
          as="header"
          sx={{
            bg: 'teal.5',
            px: constrain(...constrainRange),
            py: 4,
            gridArea: 'header',
            justifyContent: 'space-between',
            columnGap: 4,
            borderBottom: '1px solid',
            borderColor: 'teal.7'
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
            bg: 'teal.1',
            px: constrain(...constrainRange),
            py: 4,
            textAlign: 'center',
            borderTop: '1px solid',
            borderColor: 'teal.2'
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
    </React.Fragment>
  )
}

Layout.propTypes = {
  pageSEO: PropTypes.object,
  children: PropTypes.node
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
