import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';

import Icon, { IconName } from '../Icon';

const Tag = ({ name, count, className }) => {
  const href = `/tag/${name}`;

  return (
    <Link
      to={href}
      href={href}
      className={
        `inline-flex items-start justify-between text-gray-800 hover:text-teal-600 ${className}`
      }
    >
      <span>
        <Icon icon={IconName.Tag} className="mr-1" />
        {name}
      </span>
      {count && <span className="inline-block px-3 ml-2 rounded-full bg-teal-500 text-white">{count}</span>}
    </Link>
  );
};

Tag.propTypes = {
  name: PropTypes.string.isRequired,
  count: PropTypes.number,
  className: PropTypes.string,
};

Tag.defaultProps = {
  count: undefined,
  className: undefined,
};

export default Tag;
