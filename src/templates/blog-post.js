/* eslint react/prop-types: 0 */
import React, { useRef } from 'react';
import { graphql } from 'gatsby';

import PageContainer from '../components/PageContainer';
import Sidebar from '../components/Sidebar';
import Content from '../components/Content';
import UtterancesComments from '../components/UtterancesComments';
import SEO from '../components/SEO';
import Header from '../components/Header';
import ShareBox from '../components/ShareBox';
import AuthorRow from '../components/AuthorRow/AuthorRow';
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
  const {
    date, headerImage, title, tags,
  } = frontmatter;

  return (
    <>
      <span ref={ref} />
      <PageContainer id="header">
        <main className="md:col-span-2 lg:col-span-3">
          <article id="article" className="bg-white p-4 md:p-8">
            <Header
              img={headerImage}
              title={title}
              authorName={name}
              authorImage={iconUrl}
              date={date}
              tags={tags}
            />
            <div id="post">
              <Content post={html} />
            </div>
            <hr className="my-4 md:my-8" />
            <AuthorRow />
          </article>
          {isBrowser && <UtterancesComments id="utterance-container" {...utteranc} />}
          <ShareBox url={slug} hasCommentBox show={show} />
        </main>
        <aside className="hidden md:block">
          <Sidebar />
        </aside>
      </PageContainer>
      <SEO
        title={title}
        url={slug}
        siteTitleAlt="AlexIan's Blog"
        isPost
        description={excerpt}
        image={headerImage}
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
      tags
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
