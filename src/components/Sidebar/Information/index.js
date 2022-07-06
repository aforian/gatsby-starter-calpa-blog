import React from 'react';
import PropTypes from 'prop-types';

import TagList from '../TagList';
import Divider from '../Divider';

const Information = ({ totalCount }) => (
  <div className="hidden md:block mt-2">
    <Divider />
    <span className="text-black dark:text-gray-100 duration-200">
      {`共${totalCount}篇文章`}
    </span>
    <Divider />
    <TagList />
  </div>
);

Information.propTypes = {
  totalCount: PropTypes.number.isRequired,
};

export default Information;
