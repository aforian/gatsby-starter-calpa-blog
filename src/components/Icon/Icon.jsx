import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCalendarDays,
  faTag,
  faChevronUp,
  faComment,
  faLaptopCode,
  faLink,
  faSun,
  faMoon,
  faMagnifyingGlass,
  faXmark,
  faTriangleExclamation,
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
  day: faSun,
  night: faMoon,
  search: faMagnifyingGlass,
  cancel: faXmark,
  warning: faTriangleExclamation,
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
  Day: 'day',
  Night: 'night',
  Search: 'search',
  Cancel: 'cancel',
  Warning: 'warning',
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
