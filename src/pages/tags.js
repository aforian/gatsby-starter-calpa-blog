import PageContainer from '../components/PageContainer';
import Sidebar from '../components/Sidebar';
import Tag from '../components/Tag';
import SEO from '../components/SEO';
import { useQueryTags } from '../hooks/useQueryTags';
import { config } from '../../data';

const { title, url } = config;

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
        <aside className="order-first md:order-1">
          <Sidebar />
        </aside>
      </PageContainer>
      <SEO
        title="標籤"
        url={`${url}/tags`}
        siteTitleAlt={title}
        isPost={false}
        description="Tags Page"
        image="https://i.imgur.com/M795H8A.jpg"
      />
    </>
  );
};

export default TagPage;
