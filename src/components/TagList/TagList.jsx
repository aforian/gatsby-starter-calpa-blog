import PropTypes from 'prop-types';
import { Link } from 'gatsby';

const TagItem = ({ name, isLast }) => {
  const href = `/tag/${name}`;
  return (
    <Link
      className={`
        text-gray-400 hover:text-gray-600 dark:text-gray-100 hover:dark:text-gray-400 duration-200
        ${!isLast && 'after:content-["、"] after:inline-block'}`}
      to={href}
      href={href}
    >
      {name}
    </Link>
  );
};

TagItem.propTypes = {
  name: PropTypes.string.isRequired,
  isLast: PropTypes.bool.isRequired,
};

const TagList = ({ tags, className }) => (
  <div className={className}>
    {tags.map((name, index, arr) => (
      <TagItem key={name} name={name} isLast={index >= arr.length - 1} />
    ))}
  </div>
);

TagList.propTypes = {
  tags: PropTypes.arrayOf(PropTypes.string).isRequired,
  className: PropTypes.string,
};
TagList.defaultProps = {
  className: '',
};

export default TagList;
