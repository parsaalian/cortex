import React, { Component } from 'react';
import classNames from 'classnames';

import WYM from './wym';

export default class Style extends Component {
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
    const {
      // eslint-disable-next-line react/prop-types
      display,
      // eslint-disable-next-line react/prop-types
      styleName,
      // eslint-disable-next-line react/prop-types
      styleObj,
      // eslint-disable-next-line react/prop-types
      children,
    } = this.props;
    const { wymExpanded } = this.state;
    switch (display) {
      case 'inline':
        return styleName || styleObj ? (
          <span
            className={classNames(styleName, 'wys')}
            onClick={this.expandWYM}
            style={styleObj}
            role="presentation"
          >
            {children}
            <WYM wym={styleName} expand={wymExpanded} />
          </span>
        ) : (
          <>{children}</>
        );
      default:
        return styleName || styleObj ? (
          <div className={styleName} style={styleObj}>
            {children}
          </div>
        ) : (
          <>{children}</>
        );
    }
  }
}
