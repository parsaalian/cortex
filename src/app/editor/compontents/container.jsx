/* eslint react/prop-types: off */
import React from 'react';
import ComponentRegistration from 'global/models/componentRegistration/componentRegistration';
import Node from './node';

export default function Container({ node, cursor }) {
  const View = ComponentRegistration.getView(node.type);
  return (
    <View attributes={node.attributes}>
      {node.visualChildren(cursor).map((child) => (
        <Node node={child} key={child.id} cursor={cursor} />
      ))}
    </View>
  );
}
