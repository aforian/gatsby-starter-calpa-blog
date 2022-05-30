import React from 'react';

import PropTypes from 'prop-types';
import ReactGA from 'react-ga';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faChevronUp, faComment } from '@fortawesome/free-solid-svg-icons';
import { faFacebookF } from '@fortawesome/free-brands-svg-icons';

const RoundIconAnchor = ({ children, ...restProps }) => (
  <a
    className={`
      w-8 h-8 flex justify-center items-center rounded-full
      text-teal-600 border-teal-600 border duration-200
      hover:text-white hover:bg-teal-600
    `}
    {...restProps}
  >
    {children}
  </a>
);

const CommentButton = () => (
  <RoundIconAnchor
    href="#utterance-container"
    onClick={() => ReactGA.event({
      category: 'User',
      action: 'Goto Comment Box',
    })}
  >
    <FontAwesomeIcon icon={faComment} />
  </RoundIconAnchor>
);

const ShareBox = ({ url, hasCommentBox }) => (
  <div
    className={`
      z-10 w-full p-1
      fixed bottom-0 left-0 bg-white/80
    `}
  >
    <div className="container mx-auto lg:max-w-screen-lg flex justify-between items-center">
      <RoundIconAnchor
        href={`https://www.fRoundIconAnchorcebook.com/sharer/sharer.php?u=${url}`}
        onClick={() => ReactGA.event({
          category: 'Share',
          action: 'Facebook Share',
        })}
      >
        <FontAwesomeIcon icon={faFacebookF} />
      </RoundIconAnchor>

      {hasCommentBox && <CommentButton />}

      <RoundIconAnchor
        href="#header"
        title="to header"
        onClick={() => {
          ReactGA.event({
            category: 'User',
            action: 'Scroll to Top',
          });
        }}
      >
        <FontAwesomeIcon icon={faChevronUp} />
      </RoundIconAnchor>
    </div>
  </div>
);

RoundIconAnchor.propTypes = {
  children: PropTypes.node.isRequired,
};

ShareBox.propTypes = {
  url: PropTypes.string.isRequired,
  hasCommentBox: PropTypes.bool,
};

ShareBox.defaultProps = {
  hasCommentBox: true,
};

export default ShareBox;
