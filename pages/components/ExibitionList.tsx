/* eslint-disable react/function-component-definition */
/* eslint-disable prefer-destructuring */
import React from 'react';
import type { NextPage } from 'next';
import InfiniteScroll from 'react-infinite-scroll-component';
import Link from 'next/link';
import styles from '../../styles/ExibitionList.module.css';

import DataInterface from '../interfaces/data';

// This function convert dates to desired style
const takeDate = (str: String) => {
  let year;
  let month;
  let day;
  if (str) {
    year = str.split('T')[0].split('-')[0];
    month = str.split('T')[0].split('-')[1];
    day = str.split('T')[0].split('-')[2];
  }
  return year ? `${day}.${month}.${year}` : '';
};

const ExibitionList: NextPage = ({ exibitions, getMore }: any) => (
  <InfiniteScroll
    dataLength={exibitions.length} // This is important field to render the next data
    next={getMore}
    hasMore
    loader={<h4 className={styles.loading}>Loading...</h4>}
    endMessage={(
      <p style={{ textAlign: 'center' }}>
        <b>Yay! You have seen it all</b>
      </p>
    )}
  >
    <div className={styles.grid}>
      {exibitions.map(
        ({
          id, title, aic_start_at, aic_end_at, image_url,
        }: DataInterface) => {
          const dateStart = takeDate(aic_start_at);
          const dateEnd = takeDate(aic_end_at);

          return (
            <Link key={id} href="exibition/[id]" as={`exibition/${id}`}>
              <div className={styles.card}>
                <img
                  alt={title}
                  className={styles.card_image}
                  src={image_url || '/placeholder.png'}
                />
                <h4>
                  {title}
                  {' '}
                </h4>

                <p>{dateStart && `${dateStart} - ${dateEnd}`}</p>
              </div>
            </Link>
          );
        },
      )}
    </div>
  </InfiniteScroll>
);

export default ExibitionList;
