import React from 'react'
import { Link } from 'gatsby'
import moment from 'moment'
import './style.scss'

class Episode extends React.Component {
  render() {
    const { title, date, slug, excerpt, acf } = this.props.data.node
    // const { slug, categorySlug } = this.props.data.node.fields;

    return (
      <div className="post">
        <div className="post__meta">
          <time
            className="post__meta-time"
            dateTime={moment(date).format('MMMM D, YYYY')}
          >
            {moment(date).format('MMMM D YYYY')}
          </time>
          <span className="post__meta-divider" />
        </div>
        <h2 className="post__title">
          <Link className="post__title-link" to={`/episodes/${slug}`}>
            {title}
          </Link>
        </h2>
        <audio className="post__audio" title={title} controls preload="none">
          <source src={`${acf.audiourl}`} />
        </audio>
        <p
          className="post__description"
          /* eslint-disable-next-line react/no-danger */
          dangerouslySetInnerHTML={{ __html: excerpt }}
        />
        <Link className="post__readmore" to={`/episodes/${slug}`}>
          Read
        </Link>
      </div>
    )
  }
}

export default Episode
