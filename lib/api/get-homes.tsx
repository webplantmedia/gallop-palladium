import { cache } from 'react';
import pool from '@lib/mls-database';

export const getHomes = cache(async () => {
  try {
    let sortBy = 'list_price';
    let sort = 'desc';
    let limit = 500;
    let offset = 0;

    try {
      const query =
        "select * FROM data_all WHERE mls_status IN ('Active','Active Contingent','Active KO','Active Option Contract','Pending','Coming Soon') and internet_address_display_yn='1' AND (nhood <> 0) order by list_price desc LIMIT 10";

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
