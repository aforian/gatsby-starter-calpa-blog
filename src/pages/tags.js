import React from 'react';

import Sidebar from '../components/Sidebar';
import Tag from '../components/Tag';
import SEO from '../components/SEO';
import { useQueryTags } from '../hooks/useQueryTags';

const TagPage = () => {
  const tags = useQueryTags();

  return (
    <>
      <div
        id="header"
        className="container lg:max-w-screen-lg mx-auto pt-5 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5"
      >
        <main className="md:col-span-2 lg:col-span-3">
          {tags.map(({ name, count }) => (
            <Tag name={name} key={name} count={count} />
          ))}
        </main>
        <aside>
          <Sidebar />
        </aside>
      </div>
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
