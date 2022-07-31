import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import { useDarkMode } from '../../hooks/useDarkMode';
import './index.scss';

const UtterancesComments = ({
  id, repo, issueTerm, themeLight, themeDark,
}) => {
  const commentBox = useRef();
  const { dark: darkTheme } = useDarkMode();
  const theme = darkTheme ? themeDark : themeLight;

  useEffect(() => {
    const scriptEl = document.createElement('script');
    scriptEl.setAttribute('src', 'https://utteranc.es/client.js');
    scriptEl.setAttribute('crossorigin', 'anonymous');
    scriptEl.setAttribute('async', true);
    scriptEl.setAttribute('repo', repo);
    scriptEl.setAttribute('issue-term', issueTerm);
    scriptEl.setAttribute('theme', theme);

    commentBox.current.appendChild(scriptEl);

    return () => {
      if (commentBox?.current?.innerHTML) {
        commentBox.current.innerHTML = '';
      }
    };
  }, []);

  useEffect(() => {
    const iframe = commentBox?.current?.querySelector('iframe');

    if (iframe) {
      iframe.contentWindow?.postMessage({
        type: 'set-theme',
        theme,
      }, 'https://utteranc.es');
    }
  }, [theme]);

  return (
    <div className="pt-3 px-3 md:px-0">
      <div ref={commentBox} id={id} />
    </div>
  );
};

UtterancesComments.propTypes = {
  id: PropTypes.string.isRequired,
  repo: PropTypes.string.isRequired,
  issueTerm: PropTypes.string,
  themeLight: PropTypes.string,
  themeDark: PropTypes.string,
};
UtterancesComments.defaultProps = {
  issueTerm: 'title',
  themeLight: 'github-light',
  themeDark: 'github-dark',
};

export default UtterancesComments;
