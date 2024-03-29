import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import { buildSlugPrefix } from '../../utils/buildSlugPrefix';

const PostNodePropType = PropTypes.shape({
  frontmatter: PropTypes.shape({
    title: PropTypes.string.isRequired,
  }),
  fields: PropTypes.shape({
    slug: PropTypes.string.isRequired,
  }),
});

const SibilingItem = ({ node, type }) => {
  const { frontmatter, fields } = node;
  const { slug } = fields;
  const { title } = frontmatter;

  const className = {
    previous: 'text-left ml-0 mr-auto',
    next: 'text-right mr-0 ml-auto col-start-2',
  };
  const typeText = {
    previous: '上一篇',
    next: '下一篇',
  };

  return (
    <div className={`dark:text-gray-100 duration-200 ${className[type]}`}>
      <span className="text-sm">{typeText[type]}</span>
      <Link
        to={buildSlugPrefix(slug)}
        className="hover:text-teal-600 hover:dark:text-teal-300"
      >
        <h4 className="font-semibold">{title}</h4>
      </Link>
    </div>
  );
};

SibilingItem.propTypes = {
  node: PostNodePropType.isRequired,
  type: PropTypes.string.isRequired,
};

const SibilingArticles = ({ previous, next }) => (
  <div className="grid grid-cols-2 gap-5">
    {previous?.frontmatter && <SibilingItem node={previous} type="previous" />}
    {next?.frontmatter && <SibilingItem node={next} type="next" />}
  </div>
);

SibilingArticles.propTypes = {
  previous: PostNodePropType,
  next: PostNodePropType,
};
SibilingArticles.defaultProps = {
  previous: null,
  next: null,
};

export default SibilingArticles;
