import { useRef } from 'react';
import { getSrc } from 'gatsby-plugin-image';
import { graphql } from 'gatsby';

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
import { buildSlugPrefix } from '../utils/buildSlugPrefix';

import { config } from '../../data';

// Styles
import './blog-post.scss';
import { useDarkMode } from '../hooks/useDarkMode';

const { name, iconUrl, utteranc, url } = config;

const BlogPost = ({ data, pageContext, location }) => {
  const { node, previous, next } = pageContext;
  const { dark: darkTheme } = useDarkMode();
  const ref = useRef();
  const show = useIntersectionObserver(ref);
  const { html, frontmatter, fields, excerpt } = node;
  const { slug } = fields;
  const { date, headerImage, title, tags } = frontmatter;

  return (
    <>
      <span ref={ref} />
      <PageContainer id="header">
        <main className="md:col-span-2 lg:col-span-3">
          <article
            id="article"
            className="bg-white p-4 md:p-8 dark:bg-neutral-900 duration-200"
          >
            <Header
              img={data.markdownRemark.frontmatter.headerImage}
              title={title}
              authorName={name}
              authorImage={iconUrl}
              date={date}
              tags={tags}
            />
            <div id="post" className={darkTheme ? 'dark' : ''}>
              <Content post={html} />
            </div>
            <hr className="my-4 md:my-8" />
            <SibilingArticles previous={previous} next={next} />
            <hr className="my-4 md:my-8" />
            <AuthorRow />
          </article>
          <UtterancesComments id="utterance-container" {...utteranc} />
          <ShareBox url={location.href} hasCommentBox show={show} />
        </main>
        <aside className="hidden md:block">
          <Sidebar />
        </aside>
      </PageContainer>
      <SEO
        title={title}
        url={`${url}${buildSlugPrefix(slug)}`}
        siteTitleAlt="AlexIan's Blog"
        isPost
        description={excerpt}
        image={`${url}${getSrc(headerImage)}`}
      />
    </>
  );
};

export const pageQuery = graphql`
  query postQuery($id: String!) {
    markdownRemark(id: { eq: $id }) {
      frontmatter {
        headerImage {
          publicURL
          childImageSharp {
            gatsbyImageData(
              width: 1000
              placeholder: BLURRED
              formats: [AUTO, WEBP, AVIF]
            )
          }
        }
      }
    }
  }
`;

export default BlogPost;
