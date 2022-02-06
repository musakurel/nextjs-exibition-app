/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable react/function-component-definition */
import React from 'react';
import type { GetServerSideProps, NextPage } from 'next';
import Link from 'next/link';
import styles from '../../../styles/ExibitionDetail.module.css';
import DataInterface from '../../interfaces/data';
import Error404 from '../../404';

// This function convert dates to desired style

const takeDate = (str: String) => {
  let year;
  let month;
  let day;
  if (str) {
    const data = str.split('T')[0].split('-');
    [year, month, day] = data;
  }
  return year ? `${day}.${month}.${year}` : '';
};

const ExibitionDetail: NextPage<{ data: DataInterface }> = (props) => {
  if (!props.data) {
    return <Error404 />;
  }
  const {
    title, aic_start_at, aic_end_at, image_url, description,
  } = props.data as DataInterface;
  const dateStart = takeDate(aic_start_at);
  const dateEnd = takeDate(aic_end_at);
  return (
    <div className={styles.card}>
      <h4>
        {title}
        {' '}
      </h4>

      <p>{dateStart && `${dateStart} - ${dateEnd}`}</p>

      <div className={styles.detail}>
        <img
          alt={title}
          className={styles.card_image}
          src={image_url || '/placeholder.png'}
        />
        <p>{description}</p>
      </div>

      <Link href="/">
        <button type="button" className={styles.detailButton}> Go to all exibitions </button>
      </Link>
    </div>
  );
};

export default ExibitionDetail;

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  // if there is an exibition with given id, we send our data, otherwise we send 404 Error
  try {
    const { id } = query;
    const result = await fetch(
      `https://api.artic.edu/api/v1/exhibitions/${id}`,
    );

    const datas = await result.json();
    if (!datas.data) {
      throw new Error();
    }
    const { data } = datas;
    return {
      props: {
        data,
      },
    };
  } catch {
    return {
      props: {},
    };
  }
};
