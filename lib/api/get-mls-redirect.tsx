'use server';

import { cache } from 'react';
import pool from '@lib/mls-database';

export const getMLSRedirect = cache(async (id: string = '') => {
  try {
    const query =
      "select SQL_CALC_FOUND_ROWS address,city,state_or_province_text FROM data_all WHERE mls_status IN ('Active','Active Contingent','Active KO','Active Option Contract','Pending','Coming Soon') AND listing_id=" +
      id;

    // console.log(query);
    const [results, fields] = await pool.query(query);

    return results;
  } catch (err) {
    // console.log(err);
  }
  return [];
});
