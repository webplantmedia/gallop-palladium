import { cache } from 'react';
import pool from '@lib/mls-database';

export const getMLSHomes = cache(async (slug: any) => {
  try {
    let sortBy = 'list_price';
    let sort = 'desc';
    let limit = 500;
    let offset = 0;

    try {
      const query =
        "select SQL_CALC_FOUND_ROWS address,public_remarks,modification_timestamp,date_inserted,listing_key_numeric,listing_id FROM data_all WHERE mls_status IN ('Active','Active Contingent','Active KO','Active Option Contract','Pending','Coming Soon') AND listing_id=" +
        slug;

      // console.log(query);
      const [results, fields] = await pool.query(query);

      return results;
    } catch (err) {
      // console.log(err);
    }
  } catch (err) {
    return [];
  }

  return [];
});
