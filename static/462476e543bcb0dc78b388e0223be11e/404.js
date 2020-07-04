import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

class NotFoundPage extends React.Component {
  render() {
    return (
      <Layout pageSEO={{ title: "404: Not Found" }}>
        <h1>Not Found</h1>
        <p>You just hit a route that doesn&#39;t exist.</p>
      </Layout>
    )
  }
}

export default NotFoundPage
