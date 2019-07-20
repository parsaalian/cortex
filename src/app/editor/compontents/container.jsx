/* eslint react/prop-types: off */
/* eslint react/no-array-index-key: off */
import React from 'react';
import ComponentRegistration from 'models/utils/componentRegistration';
import Node from './node';

export default function Container({ node, cursor }) {
  const View = ComponentRegistration.getView(node.type);
  return (
    <View attributes={node.attributes}>
      {node.visualChildren(cursor).map((child, i) => (
        <Node node={child} key={i} cursor={cursor} />
      ))}
    </View>
  );
}
