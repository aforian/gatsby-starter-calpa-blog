import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTag } from '@fortawesome/free-solid-svg-icons';

import { useQueryTags } from '../../../hooks/useQueryTags';

const TagLink = ({ tag }) => {
  const { name, count } = tag;
  const href = `/tag/${name}`;

  return (
    <Link
      to={href}
      href={href}
      className="w-full flex justify-between items-start text-gray-800 hover:text-teal-600 mb-2 last:mb-0"
    >
      <span>
        <FontAwesomeIcon icon={faTag} className="mr-1" />
        {`${name}`}
      </span>
      <span className="inline-block px-3 ml-2 rounded-full bg-teal-500 text-white">{count}</span>
    </Link>
  );
};

TagLink.propTypes = {
  tag: PropTypes.shape({
    name: PropTypes.string,
    count: PropTypes.number,
  }).isRequired,
};

const TagList = () => {
  const tags = useQueryTags();

  return (
    <div>
      <h4 className="text-lg mb-2">
        <span>文章分類</span>
      </h4>
      <ul className="flex flex-col items-start text-left">
        {tags.map(tag => (
          <TagLink key={tag.name} tag={tag} />
        ))}
      </ul>
    </div>
  );
};

export default TagList;
