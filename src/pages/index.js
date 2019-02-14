import React from 'react'
import { Link } from "gatsby"

import { graphql } from 'gatsby'
import get from 'lodash/get'
import Helmet from 'react-helmet'
import Hero from '../components/hero'
import Layout from '../components/layout'
import ArticlePreview from '../components/article-preview'

class RootIndex extends React.Component {
  render() {
    const siteTitle = get(this, 'props.data.site.siteMetadata.title')
    const [siteSettings] = get(this, 'props.data.allContentfulSettings.edges')
    const posts = get(this, 'props.data.allContentfulBlogPost.edges')
    const [author] = get(this, 'props.data.allContentfulPerson.edges')

    return (
      <Layout location={this.props.location} >
        <div style={{ background: '#fff' }}>
          <Helmet>
            <meta charSet="utf-8" />
            <title>My Title</title>
            <link rel="canonical" href="http://mysite.com/example" />
            <link rel="stylesheet" href="https://use.typekit.net/ojc7pzz.css" />
            <body className="font-sans leading-normal text-lg antialiased" />
          </Helmet>
          <div className="w-3/4 py-16 h-screen-50 flex items-center">
            <div>
              <h1 className="font-serif font-semibold leading-tight text-semibold text-black text-4xl lg:text-5xl py-6">{siteSettings.node.tagline}</h1>
              <div className="text-lg md:text-2xl">{siteSettings.node.subline} <a href="mailto:hello@patrikarvidson.com">Send me an e-mail!</a></div>
            </div>
          </div>
          <div className="mx-2">
            <h2 className="section-headline">Recent articles</h2>
            <ul className="article-list">
              {posts.map(({ node }) => {
                return (
                  <li key={node.slug}>
                    <ArticlePreview article={node} />
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      </Layout>
    )
  }
}

export default RootIndex

export const pageQuery = graphql`
  query HomeQuery {
    site {
      siteMetadata {
        title
      }
    }
    allContentfulBlogPost(sort: { fields: [publishDate], order: DESC }) {
      edges {
        node {
          title
          slug
          publishDate(formatString: "MMMM Do, YYYY")
          tags
          heroImage {
            fluid(maxWidth: 350, maxHeight: 196, resizingBehavior: SCALE) {
             ...GatsbyContentfulFluid_tracedSVG
            }
          }
          description {
            childMarkdownRemark {
              html
            }
          }
        }
      }
    }
    allContentfulSettings(filter: { contentful_id: { eq: "4YFMbGrvKsFO9xnO8KUzFz" } }) {
      edges {
        node {
          tagline
          subline
        }
      }
    }
    allContentfulPerson(filter: { contentful_id: { eq: "15jwOBqpxqSAOy2eOO4S0m" } }) {
      edges {
        node {
          name
          shortBio {
            shortBio
          }
          title
        }
      }
    }
  }
`
