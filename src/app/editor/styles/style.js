import React, { Component, Fragment } from "react";
import classNames from "classnames";
import WYM from "./wym/wym";

export default class Style extends Component {
  constructor(props) {
    super(props);
    this.state = { wymExpanded: false };
    this.expandWYM = this.expandWYM.bind(this);
  }

  expandWYM(e) {
    e.preventDefault();
    this.setState({
      wymExpanded: !this.state.wymExpanded
    });
  }

  render() {
    switch (this.props.type) {
      case "inline":
        return this.props.styleName || this.props.styleObj ?
                <span className={classNames(this.props.styleName, "wys")} onClick={this.expandWYM} style={this.props.styleObj}>
                  {this.props.children}
                  <WYM wym={this.props.styleName} expand={this.state.wymExpanded} />
                </span> :
                <Fragment>{this.props.children}</Fragment>
      default:
        return this.props.styleName || this.props.styleObj ?
                <div className={this.props.styleName} style={this.props.styleObj}>{this.props.children}</div> :
                <Fragment>{this.props.children}</Fragment>
    }
  }
}
