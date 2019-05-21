import React from 'react'
import Helmet from 'react-helmet'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import PageTemplateDetails from '../components/PageTemplateDetails'

class PageTemplate extends React.Component {
  render() {
    const { title, subtitle } = this.props.data.site.siteMetadata

    return (
      <Layout>
        <div>
          <Helmet>
            {/* <title>{`${pageTitle} - ${title}`}</title> */}
            <meta name="description" content={'description'} />
          </Helmet>
        </div>
      </Layout>
    )
  }
}

export default PageTemplate

export const pageQuery = graphql`
  query PageBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        subtitle
        copyright
        menu {
          label
          path
        }
        author {
          name
          email
          telegram
          twitter
          github
          rss
          vk
        }
      }
    }
    allWordpressPage(filter: { slug: { eq: $slug } }) {
      edges {
        node {
          id
          title
          content
          excerpt
          date
          modified
          slug
          status
        }
      }
    }
  }
`
