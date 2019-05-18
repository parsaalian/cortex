import React, { Component, Fragment } from 'react';

export default class Style extends Component {
  render() {
    switch (this.props.type) {
      case 'inline':
        return this.props.styleName ?
                <span className={this.props.styleName}>{this.props.children}</span> :
                <Fragment>{this.props.children}</Fragment>
      default:
        return this.props.styleName ?
                <div className={this.props.styleName}>{this.props.children}</div> :
                <Fragment>{this.props.children}</Fragment>
    }
  }
}
