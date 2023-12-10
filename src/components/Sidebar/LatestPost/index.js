import { Link } from 'gatsby';
import PropTypes from 'prop-types';

const LatestPost = ({ posts }) => (
  <div>
    <h4 className="text-lg mb-3">最新文章</h4>
    <div className="flex flex-col items-start">
      {posts.map(({ node }) => (
        <Link
          className="inline-block text-left mb-2 last:mb-0 duration-200 text-teal-600 hover:text-teal-700"
          to={node.frontmatter.url || node.frontmatter.slug || node.fields.slug}
          key={
            node.frontmatter.url || node.frontmatter.slug || node.fields.slug
          }
          href={
            node.frontmatter.url || node.frontmatter.slug || node.fields.slug
          }
        >
          {node.frontmatter.title}
        </Link>
      ))}
    </div>
  </div>
);

LatestPost.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default LatestPost;
