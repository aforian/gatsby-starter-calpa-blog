/* eslint-disable react/prop-types */
import React, { useRef } from 'react';
import { graphql } from 'gatsby';

import Card from '../components/Card';
import SEO from '../components/SEO';
import Sidebar from '../components/Sidebar';
import Tag from '../components/Tag';
import ShareBox from '../components/ShareBox';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

const TagPage = ({ data, pageContext, location }) => {
  const { edges } = data.allMarkdownRemark;
  const { tag } = pageContext;
  const ref = useRef();
  const show = useIntersectionObserver(ref);

  return (
    <>
      <span ref={ref} />
      <div className="container lg:max-w-screen-lg mx-auto md:pt-5 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5">
        <main className="md:col-span-2 lg:col-span-3">
          <div className="text-xl m-4 md:mx-0">
            <Tag name={tag} />
            <span className="text-lg ml-2">
              {`共有 ${edges.length} 篇文章`}
            </span>
          </div>
          {edges.map(({ node }) => (
            <Card {...node.frontmatter} key={node.id} />
          ))}
        </main>
        <aside>
          <Sidebar />
        </aside>
      </div>
      <ShareBox url={location.href} show={show} />
      <SEO
        title={tag}
        url={`/tag/${tag}`}
        siteTitleAlt="Calpa's Blog"
        isPost={false}
        description={tag}
        image="https://i.imgur.com/M795H8A.jpg"
      />
    </>
  );
};

export default TagPage;

export const pageQuery = graphql`
  query tagQuery($tag: [String!]) {
    allMarkdownRemark(
      sort: { order: DESC, fields: frontmatter___date }
      filter: { frontmatter: { tags: { in: $tag } } }
    ) {
      edges {
        node {
          id
          frontmatter {
            id
            url: slug
            title
            date
            tags
            headerImage
            description
          }
        }
      }
    }
  }
`;
