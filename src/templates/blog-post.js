/* eslint react/prop-types: 0 */
import React, { useRef } from 'react';

import PageContainer from '../components/PageContainer';
import Sidebar from '../components/Sidebar';
import Content from '../components/Content';
import UtterancesComments from '../components/UtterancesComments';
import SEO from '../components/SEO';
import Header from '../components/Header';
import ShareBox from '../components/ShareBox';
import AuthorRow from '../components/AuthorRow/AuthorRow';
import SibilingArticles from '../components/SibilingArticles';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

import { config } from '../../data';

// Styles
import './blog-post.scss';

const { name, iconUrl, utteranc } = config;

// Prevent webpack window problem
const isBrowser = typeof window !== 'undefined';

const BlogPost = ({ pageContext }) => {
  const { node, previous, next } = pageContext;
  const ref = useRef();
  const show = useIntersectionObserver(ref);
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
            <SibilingArticles previous={previous} next={next} />
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

export default BlogPost;
