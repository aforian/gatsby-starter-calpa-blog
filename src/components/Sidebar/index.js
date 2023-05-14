import React from 'react';
import { Link, graphql, useStaticQuery } from 'gatsby';
import PropTypes from 'prop-types';

import Information from './Information';
import Icon from '../Icon';

import { config } from '../../../data';
import { authorsLinks } from '../../apis/authorLinks';

const {
  wordings = [],
  iconUrl,
  about,
  author,
} = config;

const IconLink = ({ href, icon, title }) => (
  <a
    className={`
      inline-block mr-2 last:mr-0 hover:text-teal-600
      dark:text-gray-100 hover:dark:text-teal-300 duration-200
    `}
    target="_blank"
    href={href}
    title={title}
    rel="external nofollow noopener noreferrer"
  >
    <Icon icon={icon} className="fa-lg" />
  </a>
);

IconLink.propTypes = {
  href: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

const Sidebar = ({ className }) => {
  const { all } = useStaticQuery(graphql`
    query SidebarQuery {
      all: allMarkdownRemark {
        totalCount
      }
    }
  `);

  return (
    <menu
      className={`
        grid grid-cols-3 md:grid-cols-1 gap-4 md:gap-1 p-4 bg-white border-b-4 border-b-teal-500
        text-left md:text-center text-black duration-200
        dark:bg-neutral-900
        ${className}
      `}
    >
      <div className="flex justify-center">
        <Link to={about} href={about} className="block hover:text-teal-600 aspect-rect">
          <img
            src={iconUrl}
            className="block md:w-24 hover:opacity-90 duration-200"
            alt={author}
          />
        </Link>
      </div>
      <div className="col-span-2">
        <Link
          to={about}
          href={about}
          className="hover:text-teal-600 duration-200 dark:text-gray-100 hover:dark:text-teal-300"
        >
          <div className="font-bold text-xl mb-2">{author}</div>
        </Link>
        <p className="whitespace-pre mb-1 duration-200 dark:text-gray-100">{wordings.join('\n')}</p>
        {authorsLinks.map(link => <IconLink key={link.href} {...link} />)}
        <Information totalCount={all.totalCount} />
      </div>
    </menu>
  );
};

Sidebar.propTypes = {
  className: PropTypes.string,
};
Sidebar.defaultProps = {
  className: undefined,
};

export default Sidebar;
