import { cache } from 'react';
import pool from '@lib/mls-database';

export const getMLSHomesAll = cache(async () => {
  let offset = 0;
  let items: any[] = [];
  let continueFetching = true;

  while (continueFetching) {
    try {
      let data = await getMLSHomesSlugs(offset);
      items = items.concat(data);
      offset += 100;
      if (items.length < offset) {
        continueFetching = false;
      }
    } catch (error) {
      console.error(`Error fetching data at offset ${offset}: ${error}`);
    }
  }

  return items;
});

async function getMLSHomesSlugs(offset: number) {
  try {
    const query =
      "select SQL_CALC_FOUND_ROWS listing_id,address,city,state_or_province_text,modification_timestamp FROM data_all WHERE mls_status IN ('Active','Active Contingent','Active KO','Active Option Contract','Pending','Coming Soon','Closed') LIMIT 100 OFFSET " +
      offset.toString();

    // console.log(query);
    const [results, fields] = await pool.query(query);
    return results;
  } catch (err) {
    return [];
  }
}
