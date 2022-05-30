/* eslint react/prop-types: 0 */
import React from 'react';
import Link from 'gatsby-link';

import Card from '../components/Card';
import Sidebar from '../components/Sidebar';
import ShareBox from '../components/ShareBox';

const NavLink = ({ disabled, url, text }) => {
  const statusClassName = !disabled
    ? 'text-teal-600 hover:text-teal-700 hover:bg-gray-50 cursor-pointer'
    : 'text-gray-300 bg-gray-100 cursor-not-allowed';

  return (
    <Link to={`${url}`}>
      <div
        className={`
          inline-block w-24 p-2 text-center bg-white border border-gray-200 rounded duration-200
          ${statusClassName}
        `}
      >
        {text}
      </div>
    </Link>
  );
};

const Page = ({ pageContext, location }) => {
  const {
    group, index, first, last, pathPrefix,
  } = pageContext;

  const previousUrl = index - 1 === 1 ? '' : `/${pathPrefix}/${index - 1}`;
  const nextUrl = `/${pathPrefix}/${index + 1}`;

  return (
    <>
      <div className="container max-w-screen-lg mx-auto pt-5 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5">
        <aside>
          <Sidebar />
        </aside>
        <main className="md:col-span-2 lg:col-span-3">
          {group.map(({ node }) => (
            <Card
              {...node.frontmatter}
              url={node.frontmatter.slug ? node.frontmatter.slug : node.fields.slug}
              key={node.fields.slug}
            />
          ))}
          <div className="flex justify-between mb-3">
            <NavLink disabled={first} url={previousUrl} text="Previous" />
            <NavLink disabled={!last} url={nextUrl} text="Next" />
          </div>
        </main>
      </div>
      <ShareBox url={location.href} hasCommentBox={false} />
    </>
  );
};

export default Page;
