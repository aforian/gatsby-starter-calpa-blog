const path = require('path');
const createPaginatedPages = require('gatsby-paginate');
const { config } = require('../data');

module.exports = async ({ actions, graphql }) => {
  const { createPage } = actions;

  await graphql(`
    {
      allMarkdownRemark(
        limit: 1000
        sort: { order: DESC, fields: frontmatter___date }
        filter: { frontmatter: { publish: { eq: true } } }
      ) {
        edges {
          node {
            id
            html
            excerpt
            fields {
              slug
            }
            frontmatter {
              tags
              templateKey
              slug
              id
              title
              publish
              url: slug
              date
              tags
              description
              headerImage {
                childImageSharp {
                  gatsbyImageData(
                    width: 300
                    placeholder: BLURRED
                    formats: [AUTO, WEBP, AVIF]
                  )
                }
              }
            }
          }
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      return Promise.reject(result.errors);
    }

    const { edges = [] } = result.data.allMarkdownRemark;

    const tagSet = new Set();

    createPaginatedPages({
      edges,
      createPage,
      pageTemplate: 'src/templates/index.js',
      pageLength: config.maxPostsInPage,
      context: {
        totalCount: edges.length,
      },
      pathPrefix: 'pages',
      buildPath: (index, pathPrefix) => {
        if (index > 1) {
          return `${pathPrefix}/${index}`;
        }
        return '/';
      },
    });

    // 創建文章頁面
    edges.forEach(({ node }, index) => {
      const { id, frontmatter, fields } = node;
      const { slug, tags, templateKey } = frontmatter;

      // 讀取標籤
      if (tags) {
        tags.forEach(item => tagSet.add(item));
      }

      // 自訂網址
      let $path = fields.slug;
      if (slug) {
        $path = slug;
      }

      const component = templateKey || 'blog-post';
      const previous = edges[index - 1]?.node || null;
      const next = edges[index + 1]?.node || null;

      createPage({
        path: $path,
        hello: 'hello',
        component: path.resolve(`src/templates/${String(component)}.js`),
        // additional data can be passed via context
        context: {
          id,
          node,
          previous,
          next,
        },
      });
    });

    // 創建標籤頁面
    tagSet.forEach(tag => {
      createPage({
        path: `/tag/${tag}`,
        component: path.resolve('src/templates/tag.js'),
        context: {
          tag,
        },
      });
    });
  });
};
