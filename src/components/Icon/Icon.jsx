import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCalendarDays, faTag, faChevronUp, faComment, faLaptopCode, faLink,
} from '@fortawesome/free-solid-svg-icons';
import {
  faGithub, faMediumM, faCodepen, faFacebookF,
} from '@fortawesome/free-brands-svg-icons';

const icons = {
  date: faCalendarDays,
  tag: faTag,
  up: faChevronUp,
  comment: faComment,
  facebook: faFacebookF,
  github: faGithub,
  medium: faMediumM,
  codepen: faCodepen,
  portfolio: faLaptopCode,
  link: faLink,
};

export const IconName = {
  Date: 'date',
  Tag: 'tag',
  Up: 'up',
  Comment: 'comment',
  Facebook: 'facebook',
  Github: 'github',
  Medium: 'medium',
  Codepen: 'codepen',
  Portfolio: 'portfolio',
  Link: 'link',
};

const Icon = ({ icon, className }) => {
  useEffect(() => {
    if (icons[icon] === undefined) {
      console.warn(`Icon with name: "${icon}" not exist`);
    }
  }, [icon]);

  return (
    <FontAwesomeIcon icon={icons[icon]} className={className} />
  );
};

Icon.propTypes = {
  icon: PropTypes.string.isRequired,
  className: PropTypes.string,
};

Icon.defaultProps = {
  className: '',
};

export default Icon;
