import React from 'react';

import PropTypes from 'prop-types';

import Friend from '../Friend';
import LatestPost from '../LatestPost';
// import './index.scss';

const Divider = () => <hr className="my-3" />;

// eslint-disable-next-line react/prop-types
const Information = ({ totalCount, posts }) => (
  <div className="hidden md:block my-2">
    <Divider />
    <p>
      共&nbsp;
      {totalCount}
      &nbsp;篇文章
    </p>
    <Divider />
    <LatestPost posts={posts} />
    <Divider />
    <Friend />
  </div>
);

Information.propTypes = {
  totalCount: PropTypes.number.isRequired,
  posts: PropTypes.array,
};

Information.defaultProps = {
  posts: [],
};

export default Information;
