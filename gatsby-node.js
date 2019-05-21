const _ = require('lodash')
const Promise = require('bluebird')
const path = require('path')
const slash = require('slash')

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  return new Promise((resolve, reject) => {
    const postTemplate = path.resolve('./src/templates/post-template.jsx')
    const podcastTemplate = path.resolve('./src/templates/podcast-template.jsx')
    const pageTemplate = path.resolve('./src/templates/page-template.jsx')
    const tagTemplate = path.resolve('./src/templates/tag-template.jsx')
    const categoryTemplate = path.resolve(
      './src/templates/category-template.jsx'
    )

    graphql(`
      {
        allMarkdownRemark(
          limit: 1000
          filter: { frontmatter: { draft: { ne: true } } }
        ) {
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                tags
                layout
                category
              }
            }
          }
        }
        allWordpressPage {
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
        allWordpressWpPodcast {
          edges {
            node {
              id
              title
              excerpt
              content
              date
              status
              slug
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
        allWordpressPost {
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
            }
          }
        }
      }
    `).then(result => {
      if (result.errors) {
        console.log(result.errors)
        reject(result.errors)
      }
      // Access query results via object destructuring
      const {
        allWordpressPage,
        allWordpressPost,
        allWordpressWpPodcast,
      } = result.data

      // Create Page pages.
      // We want to create a detailed page for each page node.
      // The path field contains the relative original WordPress link
      // and we use it for the slug to preserve url structure.
      // The Page ID is prefixed with 'PAGE_'
      allWordpressPage.edges.forEach(edge => {
        // Gatsby uses Redux to manage its internal state.
        // Plugins and sites can use functions like "createPage"
        // to interact with Gatsby.
        createPage({
          // Each page is required to have a `path` as well
          // as a template component. The `context` is
          // optional but is often necessary so the template
          // can query data specific to each page.
          path: edge.node.slug,
          component: slash(pageTemplate),
          context: {
            slug: edge.node.slug,
          },
        })
      })

      // We want to create a detailed page for each
      // post node. We'll just use the WordPress Slug for the slug.
      // The Post ID is prefixed with 'POST_'
      allWordpressPost.edges.forEach(edge => {
        createPage({
          path: `blog/${edge.node.slug}/`,
          component: slash(postTemplate),
          context: {
            slug: edge.node.slug,
          },
        })
      })

      allWordpressWpPodcast.edges.forEach(edge => {
        createPage({
          path: `episodes/${edge.node.slug}/`,
          component: slash(podcastTemplate),
          context: {
            slug: edge.node.slug,
          },
        })
      })

      resolve()
    })
  })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === 'File') {
    const parsedFilePath = path.parse(node.absolutePath)
    const slug = `/${parsedFilePath.dir.split('---')[1]}/`
    createNodeField({ node, name: 'slug', value: slug })
  } else if (
    node.internal.type === 'MarkdownRemark' &&
    typeof node.slug === 'undefined'
  ) {
    const fileNode = getNode(node.parent)
    let slug = fileNode.fields.slug
    if (typeof node.frontmatter.path !== 'undefined') {
      slug = node.frontmatter.path
    }
    createNodeField({
      node,
      name: 'slug',
      value: slug,
    })

    if (node.frontmatter.tags) {
      const tagSlugs = node.frontmatter.tags.map(
        tag => `/tags/${_.kebabCase(tag)}/`
      )
      createNodeField({ node, name: 'tagSlugs', value: tagSlugs })
    }

    if (typeof node.frontmatter.category !== 'undefined') {
      const categorySlug = `/categories/${_.kebabCase(
        node.frontmatter.category
      )}/`
      createNodeField({ node, name: 'categorySlug', value: categorySlug })
    }
  }
}
