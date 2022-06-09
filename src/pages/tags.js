/* eslint-disable react/prop-types */

import React from 'react';
import { graphql } from 'gatsby';

import Sidebar from '../components/Sidebar';
import Tag from '../components/Tag';
import SEO from '../components/SEO';

const TagPage = ({ data }) => {
  const { allMarkdownRemark } = data;

  const mapping = {};

  allMarkdownRemark.edges.forEach(({ node }) => {
    const { tags } = node.frontmatter;
    tags.forEach(name => {
      if (mapping[name]) {
        mapping[name] += 1;
      } else {
        mapping[name] = 1;
      }
    });
  });

  const tags = Array.from(Object.keys(mapping)).sort(
    (b, a) => mapping[a] - mapping[b],
  );

  return (
    <>
      <div
        id="header"
        className="container lg:max-w-screen-lg mx-auto pt-5 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5"
      >
        <aside>
          <Sidebar />
        </aside>
        <main className="md:col-span-2 lg:col-span-3">
          {tags.map(item => (
            <Tag name={item} key={item} count={mapping[item]} />
          ))}
        </main>
      </div>
      <SEO
        title="標籤"
        url="/tags/"
        siteTitleAlt="Alex Ian's Blog"
        isPost={false}
        description="Tags Page"
        image="https://i.imgur.com/M795H8A.jpg"
      />
    </>
  );
};

export default TagPage;

export const pageQuery = graphql`
  query getAllTags {
    allMarkdownRemark {
      edges {
        node {
          frontmatter {
            tags
          }
        }
      }
    }
  }
`;
