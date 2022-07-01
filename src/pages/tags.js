import React from 'react';

import PageContainer from '../components/PageContainer';
import Sidebar from '../components/Sidebar';
import Tag from '../components/Tag';
import SEO from '../components/SEO';
import { useQueryTags } from '../hooks/useQueryTags';

const TagPage = () => {
  const tags = useQueryTags();

  return (
    <>
      <PageContainer id="header">
        <main className="md:col-span-2 lg:col-span-3">
          <ul>
            {tags.map(({ name, count }) => (
              <li className="mb-2 text-lg" key={name}>
                <Tag name={name} count={count} className="justify-start" />
              </li>
            ))}
          </ul>
        </main>
        <aside>
          <Sidebar />
        </aside>
      </PageContainer>
      <SEO
        title="標籤"
        url="/tags/"
        siteTitleAlt="Alex Ian's Blog"
        isPost={false}
        description="Tags Page"
        image="https://i.imgur.com/M795H8A.jpg"
      />
    </>
  );
};

export default TagPage;
