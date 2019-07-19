import React from 'react';

import meta from '../_meta/styles.json';

// eslint-disable-next-line react/prop-types
export default function WYM({ wym, expand }) {
  const description = meta[wym] ? meta[wym] : { short: '', long: '' };
  return (
    // eslint-disable-next-line react/prop-types
    <span className="wym">{expand ? description.long : description.short}</span>
  );
}
