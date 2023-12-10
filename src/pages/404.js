import { Link, graphql } from 'gatsby';

import Icon, { IconName } from '../components/Icon';

const NotFoundPage = ({ data }) => (
  <div className="container mx-auto lg:max-w-screen-lg p-5">
    <h2 className="text-4xl font-bold mb-4">404 Not found!</h2>
    <h4 className="text-lg mb-4">找不到你的網頁，本站所有頁面為：</h4>
    <ul>
      {data.allSitePage.edges.map(({ node: { path } }) => (
        <li key={path} className="mb-1">
          <Link
            className="text-teal-600 hover:text-teal-700 hover:underline"
            to={path}
            href={path}
          >
            <span className="mr-2">
              <Icon icon={IconName.Link} />
            </span>
            {path === '/' ? '首頁' : path}
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

export const pageQuery = graphql`
  query getAllPages {
    allSitePage {
      edges {
        node {
          path
        }
      }
    }
  }
`;

export default NotFoundPage;
