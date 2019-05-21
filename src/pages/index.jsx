import React from 'react'
import Helmet from 'react-helmet'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import Post from '../components/Post'
import Podcast from '../components/Podcast'
import Sidebar from '../components/Sidebar'

class IndexRoute extends React.Component {
  render() {
    const items = []
    const { title, subtitle } = this.props.data.site.siteMetadata
    const posts = this.props.data.allWordpressPost.edges
    posts.forEach(post => {
      items.push(<Post data={post} key={post.node.slug} />)
    })
    const podcasts = this.props.data.allWordpressWpPodcast.edges
    podcasts.forEach(podcast => {
      items.push(<Podcast data={podcast} key={podcast.node.slug} />)
    })

    return (
      <Layout>
        <div>
          <Helmet>
            <title>{title}</title>
            <meta name="description" content={subtitle} />
          </Helmet>
          <Sidebar {...this.props} />
          <div className="content">
            <div className="content__inner">{items}</div>
          </div>
        </div>
      </Layout>
    )
  }
}

export default IndexRoute

export const pageQuery = graphql`
  query IndexQuery {
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
    allWordpressWpPodcast(
      limit: 1000
      filter: { status: { eq: "publish" } }
      sort: { order: DESC, fields: [date] }
    ) {
      edges {
        node {
          title
          slug
          id
          excerpt
          content
          date
          status
          dateFormatted: date(formatString: "MMMM DD, YYYY")
          template
          author {
            id
            name
          }
          acf {
            audiourl
            episode_number
            explicit
            category
          }
        }
      }
    }
    allWordpressPost(
      limit: 1000
      filter: { status: { eq: "publish" } }
      sort: { order: DESC, fields: [date] }
    ) {
      edges {
        node {
          id
          slug
          title
          content
          excerpt
          date
          modified
          dateFormatted: date(formatString: "MMMM DD, YYYY")
          tags {
            name
            slug
          }
          categories {
            id
            name
            slug
          }
        }
      }
    }
  }
`
