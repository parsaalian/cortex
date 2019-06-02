import _ from "lodash";
import React, { Component } from "react";
import Style from "../style";

/******************** Styling text *******************/
const stylingElements = {
  "normal-font": class NormalFont extends Component {
    render() {
      return <Style type="inline" styleName="normal-font">{this.props.children}</Style>;
    }
  },
  "roman-font": class RomanFont extends Component {
    render() {
      return <Style type="inline" styleName="roman-font">{this.props.children}</Style>;
    }
  },
  "sans-serif-font": class SansSerifFont extends Component {
    render() {
      return <Style type="inline" styleName="sans-serif-font">{this.props.children}</Style>;
    }
  },
  "mono-font": class MonoFont extends Component {
    render() {
      return <Style type="inline" styleName="mono-font">{this.props.children}</Style>;
    }
  },
  "italic": class Italic extends Component {
    render() {
      return <Style type="inline" styleName="italic">{this.props.children}</Style>;
    }
  },
  "small-capitals": class SmallCapitals extends Component {
    render() {
      return <Style type="inline" styleName="small-capitals">{this.props.children}</Style>;
    }
  },
  "uppercase": class Uppercase extends Component {
    render() {
      return <Style type="inline" styleName="uppercase">{this.props.children}</Style>;
    }
  },
  "bold": class Bold extends Component {
    render() {
      return <Style type="inline" styleName="bold">{this.props.children}</Style>;
    }
  },
  "light": class Light extends Component {
    render() {
      return <Style type="inline" styleName="light">{this.props.children}</Style>;
    }
  }
};

/******************** Sizing text ********************/
const builtInSizesNames = ["Tiny", "Script", "Footnote", "Small", "Normal", "Large1", "Large2", "Large3", "Huge1", "Huge2"];

const builtInSizes = _.reduce(builtInSizesNames, (result, value) => {
  class Element extends Component {
    render() {
      return <Style type="inline" styleName={"size-std11" + value.toLowerCase()}>{this.props.children}</Style>;
    }
  }
  Element.displayName = value + "Size";
  result["size-" + value.toLowerCase()] = Element;
  return result;
}, {});

const arbitrarySize = {
  "arbitrary-size": class ArbitrarySize extends Component {
    render() {
      return <Style type="inline" style={{"fontSize": this.props.attributes.size * 1.333333 + "px"}}>{this.props.children}</Style>;
    }
  }
};

const sizingElements = _.merge(builtInSizes, arbitrarySize);


export default _.merge(sizingElements, stylingElements);
