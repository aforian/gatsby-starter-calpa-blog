import { version } from 'react';
import ExternalLink from '../ExternalLink';
import { config } from '../../../data';

const { url, title } = config;

const Footer = () => (
  <footer className="footer py-6">
    <div className="container mx-auto">
      <div className="w-full text-center text-sm dark:text-gray-100 duration-200">
        <p>
          {'Build with '}
          <ExternalLink href="https://www.gatsbyjs.org/" title="GatsbyJS" />
          {' and '}
          <ExternalLink
            href="https://reactjs.org/"
            title={`React ${version}`}
          />
          .{' Hosted on '}
          <ExternalLink href="https://www.netlify.com/" title="Netlify" />.
        </p>
        <p>
          {'The original code is open source and available at '}
          <ExternalLink
            href="https://github.com/calpa/gatsby-starter-calpa-blog"
            title="calpa/gatsby-starter-calpa-blog"
          />
        </p>
        <p>
          {'Copyright '}
          <ExternalLink href={url} title={`©${title}`} />
          {` ${new Date().getFullYear()}.`}
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
