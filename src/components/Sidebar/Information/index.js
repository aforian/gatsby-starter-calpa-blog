import React from 'react';
import PropTypes from 'prop-types';

import TagList from '../TagList';
import Divider from '../Divider';

const Information = ({ totalCount }) => (
  <div className="hidden md:block mt-2">
    <Divider />
    <p>{`共${totalCount}篇文章`}</p>
    <Divider />
    <TagList />
  </div>
);

Information.propTypes = {
  totalCount: PropTypes.number.isRequired,
};

export default Information;
