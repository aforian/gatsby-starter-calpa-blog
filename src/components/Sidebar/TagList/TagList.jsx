import { useQueryTags } from '../../../hooks/useQueryTags';
import Tag from '../../Tag';

const TagList = () => {
  const tags = useQueryTags();

  return (
    <div>
      <h5 className="text-lg mb-2 dark:text-gray-100 duration-200">文章分類</h5>
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
