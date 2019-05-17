import React from 'react'
import Helmet from 'react-helmet'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import Podcast from '../components/Podcast'

class PodcastTemplate extends React.Component {
  render() {
    const { title, subtitle } = this.props.data.site.siteMetadata
    const episode = this.props.data.wordpressWpPodcast
    const { title: episodeTitle, summary } = episode
    // const description = postDescription !== null ? postDescription : subtitle

    return (
      <Layout>
        <div>
          <Helmet>
            <title>{`${episodeTitle} - ${title}`}</title>
            <meta name="description" content={summary} />
          </Helmet>
          <Podcast {...this.props} />
        </div>
      </Layout>
    )
  }
}

export default PodcastTemplate

export const epiodeQuery = graphql`
  query PodcastBySlug($slug: String!) {
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
    wordpressWpPodcast(slug: { eq: $slug }) {
      id
      slug
      title
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
        audio_length
        category
      }
    }
  }
`
