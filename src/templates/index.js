/* eslint react/prop-types: 0 */
import React, { useRef } from 'react';
import Link from 'gatsby-link';
import PropTypes from 'prop-types';

import PageContainer from '../components/PageContainer';
import Card from '../components/Card';
import Sidebar from '../components/Sidebar';
import ShareBox from '../components/ShareBox';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { buildSlugPrefix } from '../utils/buildSlugPrefix';

const NavLink = ({
  disabled, url, text, className = '',
}) => {
  const statusClassName = !disabled
    ? 'text-teal-600 hover:text-teal-700 hover:bg-gray-50 cursor-pointer dark:text-teal-200'
    : 'text-gray-300 bg-gray-100 cursor-not-allowed dark:text-gray-500 dark:bg-neutral-900';

  const onClick = e => {
    if (disabled) {
      e.preventDefault();
    }
  };

  return (
    <Link to={url} onClick={onClick} className={className}>
      <div
        className={`
          inline-block w-24 p-2 text-center bg-white border border-gray-200 rounded duration-200
          dark:bg-neutral-900 dark:border-neutral-700 ${statusClassName}
        `}
      >
        {text}
      </div>
    </Link>
  );
};

NavLink.propTypes = {
  disabled: PropTypes.bool.isRequired,
  url: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
};

const Page = ({ pageContext, location }) => {
  const {
    group, index, first, last, pathPrefix,
  } = pageContext;

  const previousUrl = index - 1 === 1 ? '/' : `/${pathPrefix}/${index - 1}`;
  const nextUrl = `/${pathPrefix}/${index + 1}`;
  const ref = useRef();
  const show = useIntersectionObserver(ref);

  return (
    <>
      <span ref={ref} />
      <PageContainer id="header">
        <main className="md:col-span-2 lg:col-span-3">
          {group.map(({ node }) => (
            <Card
              {...node.frontmatter}
              url={buildSlugPrefix(node.frontmatter?.slug ?? node.fields.slug)}
              key={node.fields.slug}
            />
          ))}
          {first !== last && (
            <div className="flex justify-between mb-3 mx-4 md:mx-0">
              {!first && <NavLink disabled={first} url={previousUrl} text="Previous" className="ml-0 mr-auto" />}
              {!last && <NavLink disabled={last} url={nextUrl} text="Next" className="mr-0 ml-auto" />}
            </div>
          )}
        </main>
        <aside className="order-first md:order-1">
          <Sidebar />
        </aside>
      </PageContainer>
      <ShareBox url={location.href} show={show} />
    </>
  );
};

export default Page;
