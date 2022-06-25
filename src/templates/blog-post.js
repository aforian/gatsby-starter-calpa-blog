/* eslint react/prop-types: 0 */

import React, { useRef } from 'react';
import { graphql } from 'gatsby';

import { parseChineseDate } from '../api';
import ExternalLink from '../components/ExternalLink';
import Sidebar from '../components/Sidebar';
import Content from '../components/Content';
import UtterancesComments from '../components/UtterancesComments';
import SEO from '../components/SEO';
import Header from '../components/Header';
import ShareBox from '../components/ShareBox';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

import { config } from '../../data';

// Styles
import './blog-post.scss';

const { name, iconUrl, utteranc } = config;

// Prevent webpack window problem
const isBrowser = typeof window !== 'undefined';

const BlogPost = ({ data }) => {
  const ref = useRef();
  const show = useIntersectionObserver(ref);
  const { node } = data.content.edges[0];
  const {
    html, frontmatter, fields, excerpt,
  } = node;
  const { slug } = fields;
  const { date, headerImage, title } = frontmatter;

  return (
    <>
      <span ref={ref} />
      <Header
        img={headerImage || 'https://i.imgur.com/M795H8A.jpg'}
        title={title}
        authorName={name}
        authorImage={iconUrl}
        subTitle={parseChineseDate(date)}
      />
      <div className="container lg:max-w-screen-lg mx-auto md:pt-5 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5">
        <main className="md:col-span-2 lg:col-span-3">
          <div id="post" className="bg-white p-8">
            <Content post={html} />
            <hr className="my-8" />
            <div className="mt-3 text-sm">
              如果你覺得我的文章對你有幫助的話，希望可以推薦和交流一下。
              <br />
              歡迎
              <ExternalLink
                href="https://github.com/aforian/gatsby-starter-calpa-blog"
                title="關注和 Star 這個 Blog"
              />
              或者
              <ExternalLink
                href="https://github.com/aforian/"
                title="關注我的 Github"
              />
              。
            </div>
          </div>
          {isBrowser && <UtterancesComments id="utterance-container" {...utteranc} />}
          <ShareBox url={slug} hasCommentBox show={show} />
        </main>
        <aside>
          <Sidebar />
        </aside>
      </div>
      <SEO
        title={title}
        url={slug}
        siteTitleAlt="AlexIan's Blog"
        isPost={false}
        description={excerpt}
        image={headerImage || 'https://i.imgur.com/M795H8A.jpg'}
      />
    </>
  );
};

export const pageQuery = graphql`
  fragment post on MarkdownRemark {
    fields {
      slug
    }
    frontmatter {
      id
      title
      slug
      date
      headerImage
    }
  }

  query BlogPostQuery($index: Int) {
    content: allMarkdownRemark(
      sort: { order: DESC, fields: frontmatter___date }
      skip: $index
      limit: 1
    ) {
      edges {
        node {
          id
          html
          excerpt
          ...post
        }

        previous {
          ...post
        }

        next {
          ...post
        }
      }
    }
  }
`;

export default BlogPost;
