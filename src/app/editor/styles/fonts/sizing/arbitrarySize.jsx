/* eslint react/prop-types: off */
import React from 'react';
import withStyles from 'react-jss';

import Style from '../../style';

function ArbitrarySize({ children, classes }) {
  return (
    <Style type="inline" styles={classes.arbitrarySize}>
      {children}
    </Style>
  );
}

export default withStyles({
  arbitrarySize: {
    fontSize: (props) =>
      props.attributes ? `${props.attributes.size * 1.333333}px` : '1rem',
  },
})(ArbitrarySize);
