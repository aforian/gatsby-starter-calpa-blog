import React, { useMemo } from 'react';
import { Link, StaticQuery, graphql } from 'gatsby';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faMediumM, faCodepen } from '@fortawesome/free-brands-svg-icons';
import { faLaptopCode } from '@fortawesome/free-solid-svg-icons';

import { config } from '../../../data';
import Information from './Information';

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

const Icon = ({ href, icon }) => (
  <a
    className="inline-block mr-1 last:mr-0"
    target="_blank"
    href={href}
    rel="external nofollow noopener noreferrer"
  >
    <IconWraper className="fa-layers fa-fw fa-2x">
      <FontAwesomeIcon icon={icon} />
    </IconWraper>
  </a>
);

const Sidebar = ({ totalCount, latestPosts }) => {
  const links = useMemo(() => [
    { icon: faMediumM, href: 'https://medium.com/@alexian853' },
    { icon: faGithub, href: `https://github.com/${githubUsername}` },
    { icon: faCodepen, href: 'https://codepen.io/alexian' },
    { icon: faLaptopCode, href: website },
  ]);

  return (
    <menu className="p-4 text-center bg-white">
      <Link to={about} href={about} className="inline-block hover:text-teal-600 duration-200">
        <img
          src={iconUrl}
          className="w-36 hover:scale-105 hover:opacity-90 duration-200"
          alt="Alex Ian"
        />
        <h4 className="text-xl my-2">Alex Ian</h4>
      </Link>
      {wordings.map(wording => (
        <p key={wording} className="mb-2">{wording}</p>
      ))}
      {links.map(link => <Icon key={link.href} {...link} />)}
      <Information totalCount={totalCount} posts={latestPosts} />
    </menu>
  );
};

Icon.propTypes = {
  href: PropTypes.string.isRequired,
  icon: PropTypes.object.isRequired,
};

Sidebar.propTypes = {
  totalCount: PropTypes.number,
  latestPosts: PropTypes.array,
};

Sidebar.defaultProps = {
  totalCount: 0,
  latestPosts: [],
};

export default () => (
  <StaticQuery
    query={graphql`
      fragment cardData on MarkdownRemark {
        fields {
          slug
        }
        frontmatter {
          id
          title
          url: slug
          date
          tags
          description
          headerImage
        }
      }

      query SidebarQuery {
        all: allMarkdownRemark(
          filter: { frontmatter: { publish: { eq: true } } }
        ) {
          totalCount
        }

        limited: allMarkdownRemark(
          sort: { order: DESC, fields: frontmatter___date }
          filter: { frontmatter: { publish: { eq: true } } }
          limit: 6
        ) {
          latestPosts: edges {
            node {
              ...cardData
            }
          }
        }
      }
    `}
    render={data => <Sidebar {...data.all} {...data.limited} />}
  />
);
