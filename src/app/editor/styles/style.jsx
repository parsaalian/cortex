/* eslint react/prop-types: off */
import React, { Component } from 'react';
import classNames from 'classnames';
import withStyles from 'react-jss';

import WYM from './wym';

class Style extends Component {
  constructor(props) {
    super(props);
    this.state = { wymExpanded: false };
    this.expandWYM = this.expandWYM.bind(this);
  }

  expandWYM(e) {
    e.preventDefault();
    const { wymExpanded } = this.state;
    this.setState({
      wymExpanded: !wymExpanded,
    });
  }

  render() {
    const { display, name, styles, classes, children } = this.props;
    const { wymExpanded } = this.state;
    switch (display) {
      case 'inline':
        return styles || name ? (
          <span
            className={classNames(classes.wys, styles)}
            onClick={this.expandWYM}
            role="presentation"
          >
            {children}
            <WYM wym={name} expand={wymExpanded} />
          </span>
        ) : (
          <>{children}</>
        );
      default:
        return styles ? (
          <div className={styles}>{children}</div>
        ) : (
          <>{children}</>
        );
    }
  }
}

export default withStyles({
  wys: {
    position: 'relative',
    '& .wym': {
      fontSize: 14,
      visibility: 'hidden',
      backgroundColor: 'black',
      color: '#fff',
      textAlign: 'center',
      borderRadius: 6,
      padding: '6px 6px',
      /* Position the tooltip */
      position: 'absolute',
      zIndex: '1',
      top: '105%',
      left: '50%',
      marginLeft: -60,
    },
    '&:hover': {
      backgroundColor: '#66CC66',
      '& .wym': {
        visibility: 'visible',
      },
    },
  },
})(Style);
