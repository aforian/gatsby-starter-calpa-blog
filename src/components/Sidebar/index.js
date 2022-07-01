import React, { useMemo } from 'react';
import { Link, graphql, useStaticQuery } from 'gatsby';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import Information from './Information';
import Icon, { IconName } from '../Icon';

import { config } from '../../../data';

const IconWraper = styled.span`
  path {
    transition: all 200ms;
  }
  &:hover {
    path {
      fill: rgb(13,148,136);
    }
  }
`;

const {
  wordings = [],
  githubUsername,
  iconUrl,
  about,
  website,
} = config;

const IconLink = ({ href, icon, title }) => (
  <a
    className="inline-block mr-1 last:mr-0"
    target="_blank"
    href={href}
    title={title}
    rel="external nofollow noopener noreferrer"
  >
    <IconWraper className="fa-layers fa-fw fa-lg">
      <Icon icon={icon} />
    </IconWraper>
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
      all: allMarkdownRemark(
        filter: { frontmatter: { publish: { eq: true } } }
      ) {
        totalCount
      }
    }
  `);
  const links = useMemo(() => [
    { icon: IconName.Medium, href: 'https://medium.com/@alexian853', title: 'Medium' },
    { icon: IconName.Github, href: `https://github.com/${githubUsername}`, title: 'Github' },
    { icon: IconName.Codepen, href: 'https://codepen.io/alexian', title: 'Codepen' },
    { icon: IconName.Portfolio, href: website, title: 'Portfolio' },
  ], []);

  return (
    <menu className={`p-4 text-center bg-white ${className} border-b-4 border-b-teal-500`}>
      <Link to={about} href={about} className="inline-block hover:text-teal-600 duration-200">
        <img
          src={iconUrl}
          className="w-24 hover:opacity-90 duration-200"
          alt="Alex Ian"
        />
        <h4 className="text-xl mt-1 mb-2">Alex Ian</h4>
      </Link>
      <p className="whitespace-pre mb-1">{wordings.join('\n')}</p>
      {links.map(link => <IconLink key={link.href} {...link} />)}
      <Information totalCount={all.totalCount} />
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
