import React from 'react';

import ExternalLink from '../../ExternalLink';
import { config } from '../../../../data';

const { friends = [] } = config;

const Friend = () => (
  <div className="friend">
    <h4 className="text-lg mb-3">友站連結</h4>
    {friends.map(friend => (
      <ExternalLink
        href={friend.href}
        title={friend.title}
        key={friend.title}
        rel="noopener"
      />
    ))}
  </div>
);

export default Friend;
