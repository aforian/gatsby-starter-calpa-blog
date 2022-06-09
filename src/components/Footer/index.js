import React from 'react';

import ExternalLink from '../ExternalLink';

const Footer = () => (
  <footer className="footer py-6">
    <div className="container mx-auto">
      <div className="w-full text-center">
        <p>
          {'Build with '}
          <ExternalLink href="https://www.gatsbyjs.org/" title="GatsbyJS" />
          {' and '}
          <ExternalLink
            href="https://reactjs.org/"
            title={`React ${React.version}`}
          />
          .
          {' Hosted on '}
          <ExternalLink href="https://www.netlify.com/" title="Netlify" />
          .
        </p>
        <p>
          The original code is open source and available at&nbsp;
          <ExternalLink
            href="https://github.com/calpa/gatsby-starter-calpa-blog"
            title="calpa/gatsby-starter-calpa-blog"
          />
        </p>
        <p>
          {'Copyright '}
          <ExternalLink href="https://alex-ian.me/" title="&copy;AlexIan's Blog" />
          {` ${new Date().getFullYear()}.`}
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
