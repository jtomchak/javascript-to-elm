import React from 'react'
import { Link } from 'gatsby'
import moment from 'moment'
import Disqus from '../Disqus/Disqus'
import './style.scss'

class PodcastTemplateDetails extends React.Component {
  render() {
    const { subtitle, author } = this.props.data.site.siteMetadata
    const episode = this.props.data.wordpressWpPodcast
    // const tags = post.fields.tagSlugs

    const homeBlock = (
      <div>
        <Link className="post-single__home-button" to="/">
          All Episodes
        </Link>
      </div>
    )

    // const tagsBlock = (
    //   <div className="post-single__tags">
    //     <ul className="post-single__tags-list">
    //       {tags &&
    //         tags.map((tag, i) => (
    //           <li className="post-single__tags-list-item" key={tag}>
    //             <Link to={tag} className="post-single__tags-list-item-link">
    //               {post.frontmatter.tags[i]}
    //             </Link>
    //           </li>
    //         ))}
    //     </ul>
    //   </div>
    // )

    return (
      <div>
        {homeBlock}
        <div className="post-single">
          <div className="post-single__inner">
            <h1 className="post-single__title">{episode.title}</h1>
            <div
              className="post-single__body"
              /* eslint-disable-next-line react/no-danger */
              dangerouslySetInnerHTML={{ __html: episode.content }}
            />
            <div className="post-single__date">
              <em>Published {episode.dateFormatted}</em>
            </div>
          </div>
          <div className="post-single__footer">
            {/* {tagsBlock} */}
            <hr />
            <p className="post-single__footer-text">
              <a
                href={`https://twitter.com/${author.twitter}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <br /> <strong>{author.name}</strong> on Twitter
              </a>
            </p>
          </div>
        </div>
      </div>
    )
  }
}

export default PodcastTemplateDetails
