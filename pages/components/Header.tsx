import React from 'react';

import type { NextPage } from 'next';
import styles from '../../styles/Header.module.css';

// eslint-disable-next-line react/function-component-definition
const Header: NextPage = () => (
  <>
    <h1 className={styles.title}>
      Discover
      {' '}
      <strong className={styles.header}>Exibitions </strong>
    </h1>

    <p className={styles.description}>Scroll down to start explore! </p>
  </>
);

export default Header;
