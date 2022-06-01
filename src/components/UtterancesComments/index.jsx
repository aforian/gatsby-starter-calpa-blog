import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import './index.scss';

const UtterancesComments = ({
  id, repo, issueTerm, theme,
}) => {
  const commentBox = useRef();

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
  theme: PropTypes.string,
};
UtterancesComments.defaultProps = {
  issueTerm: 'title',
  theme: 'github-light',
};

export default UtterancesComments;