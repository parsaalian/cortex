import React from 'react';
import PropTypes from 'prop-types';

import withProps from 'global/views/withProps';

import meta from '../_meta/styles.json';

// eslint-disable-next-line react/prop-types
function WYM({ wym, expand }) {
  const description = meta[wym] ? meta[wym] : { short: '', long: '' };
  return (
    // eslint-disable-next-line react/prop-types
    <span className="wym">{expand ? description.long : description.short}</span>
  );
}

export default withProps(
  WYM,
  {
    wym: PropTypes.string,
    expand: PropTypes.bool,
  },
  {
    wym: '',
    expand: false,
  },
);
