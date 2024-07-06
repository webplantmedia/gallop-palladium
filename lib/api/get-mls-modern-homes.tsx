'use server';

import { cache } from 'react';
import pool from '@lib/mls-database';

export const getMLSModernHomes = cache(
  async (
    limit: number,
    sortBy: string = 'list_price',
    sort: string = 'desc',
    slug: string = 'all'
  ) => {
    try {
      let offset = 0;
      let price = 999999;

      let lookup = ' AND (modern_style=1 OR midcentury_modern_style=1) ';
      switch (slug) {
        case 'modern':
          lookup = ' AND modern_style=1 ';
          price = 2999999;
          break;
        case 'mid-century':
          lookup = ' AND midcentury_modern_style=1 ';
          price = 499999;
          break;
        case 'dallas-modern-homes':
          price = 2999999;
          break;
      }

      const listPrice = ' AND list_price>' + price + ' ';

      try {
        const query =
          "select SQL_CALC_FOUND_ROWS list_price,address,date_inserted,lot_size_acres,living_area,bedrooms_total,bathrooms_total_integer,year_built,listing_key_numeric,city,postal_code,listing_id,photos_count,latitude,longitude,state_or_province_text,mls_status,modification_timestamp,previous_list_price,bathrooms_full,bathrooms_half,interior_features_text,other_equipment_text,flooring_text,parking_features_text,county_or_parish,directions,association_type_text,school_district,elementary_school_name,middle_school_name,high_school_name,heating_text,utilities_text,lot_size_square_feet,lot_size_dimensions,lot_features_text,fencing_text,ratio_list_price_by_lot_size_acres,transaction_type_text,tax_legal_description,restrictions_text,special_notes_text,parcel_number,tax_block,lot_number,public_remarks,standard_status_text,architect_name,open_house_upcoming,list_agent_full_name,list_office_name,nhood FROM data_all WHERE mls_status IN ('Active','Active Contingent','Active KO','Active Option Contract','Pending','Coming Soon') AND nhood>=0 AND property_type IN ('Residential')" +
          listPrice +
          " AND internet_address_display_yn='1'" +
          lookup +
          'ORDER BY ' +
          sortBy +
          ' ' +
          sort +
          ' LIMIT ' +
          limit +
          ' OFFSET ' +
          offset;

        const [results, fields] = await pool.query(query);

        return results;
      } catch (err) {
        // console.log(err);
      }
    } catch (err) {
      return [];
    }

    return [];
  }
);
