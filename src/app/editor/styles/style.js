import React, { Component, Fragment } from 'react';
import classNames from 'classnames';
import WYM from './wym';

export default class Style extends Component {
  render() {
    switch (this.props.type) {
      case 'inline':
        return this.props.styleName ?
                <span className={classNames(
                                this.props.styleName,
                                'wys')
                                }>
                  {this.props.children}
                  <WYM wym={this.props.styleName} />
                </span> :
                <Fragment>{this.props.children}</Fragment>
      default:
        return this.props.styleName ?
                <div className={this.props.styleName}>{this.props.children}</div> :
                <Fragment>{this.props.children}</Fragment>
    }
  }
}
