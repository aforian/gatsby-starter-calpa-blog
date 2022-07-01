import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';

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
    className="inline-block mr-2 last:mr-0 fa-lg hover:text-teal-600 duration-200"
    target="_blank"
    href={href}
    title={title}
    rel="external nofollow noopener noreferrer"
  >
    <Icon icon={icon} />
  </a>
);

IconLink.propTypes = {
  href: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

const AuthorRow = () => (
  <div className="grid grid-cols-3 md:grid-cols-5 gap-4 md:gap-8">
    <div className="apect-rect">
      <img
        src={iconUrl}
        className="w-full"
        alt={author}
      />
    </div>
    <div className="col-span-2 md:col-span-4 flex flex-col justify-center">
      <Link to={about} className="text-lg font-bold hover:text-teal-600">
        {author}
      </Link>
      <p className="text-sm mb-2">{wordings.join('\n')}</p>
      <div className="links">
        {authorsLinks.map(link => <IconLink key={link.href} {...link} />)}
      </div>
    </div>
  </div>
);

export default AuthorRow;
