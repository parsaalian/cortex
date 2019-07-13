/* eslint react/prop-types: off */
import React from 'react';
import withStyles from 'react-jss';

import Style from '../../style';

function DoubleSpacing({ children, styles }) {
  return (
    <Style display="block" styles={styles.doubleSpacing}>
      {children}
    </Style>
  );
}

export default withStyles({
  doubleSpacing: {
    lineHeight: '1.6',
  },
})(DoubleSpacing);
