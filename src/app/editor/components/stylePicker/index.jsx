import React from 'react';
import styles from './index.module.scss';

import Dropdown from './dropdown';
import DropItem from './dropItem';

export default function StylePicker() {
  return (
    <div className={styles.container}>
      <Dropdown>
        <DropItem name="bold" value />
      </Dropdown>
    </div>
  );
}
