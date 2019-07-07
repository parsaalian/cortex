import _ from "lodash";
import React, { Component } from "react";
import Style from "../style";

/********************** Spacings *********************/
const spacingElements = {
  "single-spacing": class SingleSpacing extends Component {
    render() {
      return <Style type="outline" styleName="single-spacing">{this.props.children}</Style>;
    }
  },
  "one-half-spacing": class OneHalfSpacing extends Component {
    render() {
      return <Style type="outline" styleName="one-half-spacing">{this.props.children}</Style>;
    }
  },
  "double-spacing": class DoubleSpacing extends Component {
    render() {
      return <Style type="outline" styleName="double-spacing">{this.props.children}</Style>;
    }
  },
  "arbitrary-spacing": class ArbitrarySpacing extends Component {
    render() {
      return <Style type="outline" styleObj={{lineHeight: this.props.attributes.lineHeight}}>{this.props.children}</Style>;
    }
  },
  "nbsp": class NBSP extends Component {
    render() {
      return <Style type="inline">&nbsp;</Style>
    }
  },
  "hfill": class HFill extends Component {
    render() {
      return <React.Fragment><Style type="inline" styleObj={{float: "right"}}>{this.props.children}</Style><br/><br/></React.Fragment>
    }
  },
  "vfill": class VFill extends Component {
    render() {
      return <Style type="outline" styleObj={{verticalAlign: "bottom"}}>{this.props.children}</Style>
    }
  }
}

export default _.merge(spacingElements);
