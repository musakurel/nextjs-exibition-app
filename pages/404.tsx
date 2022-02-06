import React from 'react';
import type { NextPage } from 'next';
import Link from 'next/link';
import styles from '../styles/Custom404.module.css';

// eslint-disable-next-line react/function-component-definition
const Custom404: NextPage = () => (

  <div className={styles.container}>
    <img className={styles.image} alt="Error" src="/error.png" />
    <h1>Page Not Found</h1>
    <Link
      href="/"
    >

      <button type="button" className={styles.button}> Go to Home </button>
    </Link>
  </div>
);

export default Custom404;
