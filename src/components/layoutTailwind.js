import React from "react"
import { graphql, useStaticQuery, Link } from "gatsby"
import Img from "gatsby-image"
import { useLocation } from "@reach/router"
import { Container, Grid, List, Menu, Segment } from "semantic-ui-react"
import SEO from "./seo"

const LayoutTailwind = ({ pageSEO = {}, children }) => {
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
      <div className="flex flex-col min-h-screen">
        <header className="flex p-4 space-x-8">
          <nav className="flex-grow self-center">
            <ul className="space-x-4">
              {navLinks.map(({ name, path }) => (
                <li className="inline-block" key={name}>
                  <Link
                    to={path}
                    className="block py-1 text-xl border-b-2 border-transparent hover:border-teal-400 transition-colors duration-300"
                    activeClassName="border-teal-400"
                    partiallyActive={path !== "/"}
                  >
                    {name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <Img
            fixed={data.avatar.childImageSharp.fixed}
            alt={author}
            imgStyle={{
              borderRadius: `50%`
            }}
          />
        </header>
        <main className="flex-grow p-4 mx-auto">{children}</main>
        <footer className="p-6 border-t space-y-4 text-center">
          <ul className="divide-x">
            {navLinks.map(({ name, path }) => (
              <li className="inline-block" key={name}>
                <Link
                  to={path}
                  className="block px-4 transition-colors duration-200 hover:text-teal-500"
                >
                  {name}
                </Link>
              </li>
            ))}
          </ul>
          <div className="text-sm">
            {`© ${new Date().getFullYear()} ${author}. Find him on`}
            {` `}
            <a href={social.github}>Github</a>
            {`!`}
          </div>
        </footer>
      </div>
    </>
  )
}

export default LayoutTailwind

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
