import { cache } from 'react';
import pool from '@lib/mls-database';

export const getMLSDetailsSeo = cache(async (slug: any) => {
  try {
    let sortBy = 'list_price';
    let sort = 'desc';
    let limit = 500;
    let offset = 0;

    try {
      const query =
        'select SQL_CALC_FOUND_ROWS list_price,address,date_inserted,lot_size_acres,living_area,bedrooms_total,bathrooms_total_integer,year_built,listing_key_numeric,city,postal_code,listing_id,photos_count,latitude,longitude,state_or_province_text,mls_status,modification_timestamp,previous_list_price,bathrooms_full,bathrooms_half,interior_features_text,other_equipment_text,flooring_text,parking_features_text,county_or_parish,directions,association_type_text,school_district,elementary_school_name,middle_school_name,high_school_name,heating_text,utilities_text,lot_size_square_feet,lot_size_dimensions,lot_features_text,fencing_text,ratio_list_price_by_lot_size_acres,transaction_type_text,tax_legal_description,restrictions_text,special_notes_text,parcel_number,tax_block,lot_number,public_remarks,standard_status_text,architect_name,open_house_upcoming,list_agent_full_name,list_office_name,nhood FROM data_all WHERE internet_address_display_yn=1 AND listing_id=' +
        slug;

      // console.log(query);
      const [results, fields] = await pool.query(query);

      return results[0];
    } catch (err) {
      // console.log(err);
    }
  } catch (err) {
    return [];
  }

  return [];
});
