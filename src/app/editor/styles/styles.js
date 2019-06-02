import _ from "lodash";
import React, { Component } from "react";
import "./styles.scss";
import Style from "./style";
import textFormattings from "./textFormattings/textFormattings";
import fonts from "./fonts/fonts";

const styles = {
  "content":
  class Text extends Component {
    render() {
      return <Style type="inline">{this.props.children}</Style>;
    }
  },
  "paragraph":
  class Paragraph extends Component {
    render() {
      return <Style type="outline">{this.props.children}</Style>;
    }
  }
};

export default _.merge(styles, textFormattings, fonts);
