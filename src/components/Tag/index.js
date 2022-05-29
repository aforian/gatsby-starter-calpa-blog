import React from 'react';
import PropTypes from 'prop-types';

const Tag = ({ name, count }) => (
  <a
    href={`/tag/${name}`}
    className={`
      relative inline-block ml-5 p-1 px-2 rounded-tr rounded-br bg-sky-500 text-white text-sm
      before:absolute before:right-full before:top-0 before:border-solid before:border-r-sky-500
      before:border-r-[14px] before:border-y-transparent before:border-y-[14px] before:border-l-0
      after:absolute after:left-[-5px] after:top-1/2 after:w-[4px] after:h-[4px] after:rounded-full
      after:bg-white after:-translate-y-1/2 duration-200 before:duration-200
      hover:bg-sky-600 hover:underline hover:decoration-1 hover:before:border-r-sky-600
    `}
  >
    {name}
    {!!count && '&nbsp;'}
    {count}
  </a>
);

Tag.propTypes = {
  name: PropTypes.string.isRequired,
  count: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

Tag.defaultProps = {
  count: '',
};

export default Tag;
