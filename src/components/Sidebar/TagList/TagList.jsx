import React from 'react';

import { useQueryTags } from '../../../hooks/useQueryTags';
import Tag from '../../Tag';

const TagList = () => {
  const tags = useQueryTags();

  return (
    <div>
      <h4 className="text-lg mb-2">
        <span>文章分類</span>
      </h4>
      <ul className="flex flex-col items-start text-left">
        {tags.map(({ name, count }) => (
          <li className="w-full mb-2 last:mb-0" key={name}>
            <Tag name={name} count={count} className="w-full" />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TagList;
