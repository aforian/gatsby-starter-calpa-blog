import { useCallback, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import { useDarkMode } from '../../hooks/useDarkMode';
import './index.scss';
import useMutationObservable from '../../hooks/useMutationObservable';

const UTTERANCES_URL = 'https://utteranc.es';

const UtterancesComments = ({ id, repo, issueTerm, themeLight, themeDark }) => {
  const commentBox = useRef();
  const { dark: darkTheme } = useDarkMode();
  const theme = darkTheme ? themeDark : themeLight;

  const setTheme = useCallback(
    iframeEl => {
      iframeEl?.contentWindow?.postMessage(
        {
          type: 'set-theme',
          theme,
        },
        UTTERANCES_URL,
      );
    },
    [theme],
  );

  const onLoadIframe = useCallback(
    mutations => {
      mutations.forEach(mutation => {
        const iframe = [...(mutation?.target?.childNodes ?? [])].find(
          node => node.nodeName === 'IFRAME',
        );

        setTheme(iframe);
      });
    },
    [setTheme],
  );

  useEffect(() => {
    const commentBoxCur = commentBox.current;
    const scriptEl = document.createElement('script');
    scriptEl.setAttribute('src', 'https://utteranc.es/client.js');
    scriptEl.setAttribute('crossorigin', 'anonymous');
    scriptEl.setAttribute('async', true);
    scriptEl.setAttribute('repo', repo);
    scriptEl.setAttribute('issue-term', issueTerm);
    scriptEl.setAttribute('theme', theme);

    commentBox.current.appendChild(scriptEl);

    return () => {
      if (commentBoxCur.innerHTML) {
        commentBoxCur.innerHTML = '';
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useMutationObservable(commentBox.current, onLoadIframe);

  useEffect(() => {
    const iframe = commentBox?.current?.querySelector('iframe');

    setTheme(iframe);
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
