/* eslint react/prop-types: off */
import React from 'react';
import withStyles from 'react-jss';

import Style from '../../style';

function Italic({ children, classes }) {
  return (
    <Style display="inline" styles={classes.italic}>
      {children}
    </Style>
  );
}

export default withStyles({
  italic: {
    fontStyle: 'italic',
  },
})(Italic);
