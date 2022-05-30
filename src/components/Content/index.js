import React, { Component } from 'react';
import PropTypes from 'prop-types';
import lozad from 'lozad';

import { isBrowser } from '../../api';

class Content extends Component {
  componentDidMount() {
    // lazy loads elements with default selector as '.lozad'
    // Prevent WebPack build fail
    if (isBrowser()) {
      // Initialize library
      const observer = lozad('.lozad', {
        load(el) {
          /* eslint-disable no-param-reassign */

          el.src = el.dataset.src;
          el.onload = () => {
            el.classList.add('animated');
            el.classList.add('fadeIn');
          };
          /* eslint-enable */
        },
      });
      observer.observe();
    }
  }

  render() {
    const { post } = this.props;
    return (
      <div
        className="content"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: post }}
      />
    );
  }
}

Content.propTypes = {
  post: PropTypes.string.isRequired,
};

export default Content;
