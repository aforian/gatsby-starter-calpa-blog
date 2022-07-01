import React from 'react';
import PropTypes from 'prop-types';
import ReactGA from 'react-ga';

import Icon, { IconName } from '../Icon';

const RoundIconAnchor = ({ children, ...restProps }) => (
  <a
    className={`
      w-8 h-8 flex justify-center items-center rounded mb-3 last:mb-0
      bg-gray-100 text-teal-600 border-teal-600 border duration-200
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
    <Icon icon={IconName.Comment} />
  </RoundIconAnchor>
);

const ShareBox = ({ url, hasCommentBox, show }) => (
  <div
    className={`
      z-10 p-1 fixed bottom-3 transition-opacity
      lg-pad:left-[calc((100vw-1024px)/2+1024px)] lg-pad:right-auto druation-300
      left-auto right-1 ${show ? 'opacity-100 visible' : 'opacity-0 invisible'}
    `}
  >
    <div className="container mx-auto lg:max-w-screen-lg flex flex-col justify-between items-center">
      <RoundIconAnchor
        href={`https://www.fRoundIconAnchorcebook.com/sharer/sharer.php?u=${url}`}
        onClick={() => ReactGA.event({
          category: 'Share',
          action: 'Facebook Share',
        })}
      >
        <Icon icon={IconName.Facebook} />
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
        <Icon icon={IconName.Up} />
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
  show: PropTypes.bool,
};

ShareBox.defaultProps = {
  show: false,
  hasCommentBox: false,
};

export default ShareBox;
