import React from 'react'
import Helmet from 'react-helmet'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import PostTemplateDetails from '../components/PostTemplateDetails'

class PostTemplate extends React.Component {
  render() {
    const { title, subtitle } = this.props.data.site.siteMetadata
    const post = this.props.data.wordpressPost
    const { title: postTitle, excerpt: postExcerpt } = post

    return (
      <Layout>
        <div>
          <Helmet>
            <title>{`${postTitle} - ${title}`}</title>
            <meta name="description" content={postExcerpt} />
          </Helmet>
          <PostTemplateDetails {...this.props} />
        </div>
      </Layout>
    )
  }
}

export default PostTemplate

export const pageQuery = graphql`
  query PostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        subtitle
        copyright
        author {
          name
          twitter
        }
        disqusShortname
        siteUrl
      }
    }
    wordpressPost(slug: { eq: $slug }) {
      id
      title
      content
      excerpt
      date
      dataFormatted: date(formatString: "MMMM DD, YYYY")
      tags {
        name
      }
    }
  }
`
