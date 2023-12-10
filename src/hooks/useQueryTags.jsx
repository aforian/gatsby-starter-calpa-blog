import { useMemo } from 'react';
import { graphql, useStaticQuery } from 'gatsby';

export const useQueryTags = () => {
  const data = useStaticQuery(graphql`
    query {
      allMarkdownRemark {
        edges {
          node {
            frontmatter {
              tags
            }
          }
        }
      }
    }
  `);

  const tagsCount = useMemo(() => {
    const result = {};

    data.allMarkdownRemark.edges.forEach(({ node }) => {
      const { tags: tagNames } = node.frontmatter;

      return tagNames.forEach(tagName => {
        if (result[tagName]) {
          result[tagName] += 1;
        } else {
          result[tagName] = 1;
        }
      }, {});
    });

    return result;
  }, [data]);

  return useMemo(
    () =>
      Object.entries(tagsCount)
        .map(([name, count]) => ({ name, count }))
        .sort((a, b) => b.count - a.count),
    [tagsCount],
  );
};
