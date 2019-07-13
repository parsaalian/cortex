/* eslint react/prop-types: off */
import React from 'react';
import withStyles from 'react-jss';

import Style from '../../style';

function ArbitrarySpacing({ children, classes }) {
  return (
    <Style display="block" styles={classes.arbitrarySpacing}>
      {children}
    </Style>
  );
}

export default withStyles({
  arbitrarySpacing: {
    lineHeight: (props) => (props.attributes ? props.attributes.lineHeight : 1),
  },
})(ArbitrarySpacing);
