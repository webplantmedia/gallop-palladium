const _features = [
  'Covered Patio/Porch',
  'Rain Gutters',
  'Storage',
  'Attached Grill',
  'Fire Pit',
  'Lighting',
  'Outdoor Living Center',
  'Sport Court',
  'Garden(s)',
  'Balcony',
  'Covered Deck',
  'Private Yard',
  'Other',
  'Tennis Court(s)',
  'Dog Run',
  'RV/Boat Parking',
  'Mosquito Mist System',
  'Storm Cellar',
  'Stable/Barn',
  'Private Landing Strip',
  'Rain Barrel/Cistern(s)',
  'Gas Grill',
  'Outdoor Grill',
  'Outdoor Kitchen',
  'Barbecue',
  'Uncovered Courtyard',
  'Courtyard',
  'Private Entrance',
  'Dock',
  'Playground',
  'Awning(s)',
  'Built-in Barbecue',
  'Basketball Court',
  'Covered Courtyard',
  'Misting System',
  'Outdoor Shower',
  'Permeable Paving',
  'RV Hookup',
  'Electric Grill',
  'Gray Water System',
  'Boat Slip',
  'Kennel',
  'Other',
  'Cattle Guard',
  'Fenced for Cattle',
  'Fenced for Horses',
  'Outdoor Arena',
  'Fenced for Exotic Birds/Game',
  'Corrals',
  'Kennels',
  'Auto Feed Mill',
  'Hot Walker',
  'Cul-De-Sac',
  'Sprinkler System',
  'Acreage',
  'Corner Lot',
  'Landscaped',
  'Lrg. Backyard Grass',
  'Many Trees',
  'Few Trees',
  'Interior Lot',
  'Subdivision',
  'Irregular Lot',
  'Greenbelt',
  'Park View',
  'Agricultural',
  'No Backyard Grass',
  'On Golf Course',
  'Adjacent to Greenbelt',
  'Water/Lake View',
  'Hilly',
  'Pine',
  'Sloped',
  'Varied',
  'Pasture',
  'Tank/ Pond',
  'Undivided',
  'Cleared',
  'Level',
  'Oak',
  'Other',
  'Leasehold',
  'Need Fill',
  'Cedar',
  'Airstrip',
  'Brush',
  'Rolling Slope',
  'Gullies',
  'Rugged',
  'Steep Slope',
  'Taxi-way',
  'Zero Lot Line',
  'Waterfront',
  'Flag Lot',
  'Bottom',
  'Rock Outcropping',
  'Bayou',
  'Mesquite',
  'Creek',
  'Lake Front',
  'River Front',
  'Dock – Uncovered',
  'Lake Front  - Common Area',
  'Retaining Wall – Wood',
  'Retaining Wall – Concrete',
  'Lake Front – Main Body',
  'Retaining Wall – Other',
  'Retaining Wall – Steel',
  'Water Board Authority – Private',
  'Lake Front – Corps of Engineers',
  'Water Board Authority – HOA',
  'Dock – Covered',
  'Leasehold',
  'Canal (Man Made)',
  'Flat Screen Wiring',
  'High Speed Internet Available',
  'Vaulted Ceiling(s)',
  'Wet Bar',
  'Built-in Wine Cooler',
  'Cable TV Available',
  'Decorative Lighting',
  'Elevator',
  'Multiple Staircases',
  'Smart Home System',
  'Sound System Wiring',
  'Wainscoting',
  'Dry Bar',
  'Loft',
  'Paneling',
  'Other',
  'Central Vacuum',
  'Eat-in Kitchen',
  'Double Vanity',
  'Kitchen Island',
  'Open Floorplan',
  'Pantry',
  'Walk-In Closet(s)',
  'Granite Counters',
  'Natural Woodwork',
  'Chandelier',
  'Built-in Features',
  'Cedar Closet(s)',
  'Cathedral Ceiling(s)',
  'Wired for Data',
  'Dumbwaiter',
  'Tile Counters',
  'Satellite Dish',
  'Intercom',
  'Home Theater',
  'Generator',
  'None',
  'Irrigation Equipment',
  'Air Purifier',
  'Other',
  'Negotiable',
  'Call Listing Agent',
  'List Available',
  'TV Antenna',
  'Compressor',
  'Dehumidifier',
  'Fuel Tank(s)',
  'Farm Equipment',
  'Varies By Unit',
  'Livestock Equipment',
  'DC Well Pump',
  'Rotary Antenna',
  'Ceramic Tile',
  'Laminate',
  'Carpet',
  'Marble',
  'Wood',
  'Stone',
  'Luxury Vinyl Plank',
  'Slate',
  'Concrete',
  'Vinyl',
  'Brick/Adobe',
  'Other',
  'Terrazzo',
  'Parquet',
  'Wood Under Carpet',
  'Travertine Stone',
  'Varies',
  'Simulated Wood',
  'Hardwood',
  'None',
  'Tile',
  'Linoleum',
  'Bamboo',
  'Combination',
  'Brick',
  'Cork',
  'Sustainable',
  'See Remarks',
  'Adobe',
  'Granite',
  'Painted/Stained',
  'Clay',
  'Reclaimed Wood',
  'Stamped',
  'Softwood',
  'Pavers',
  'FSC or SFI Certified Source Hardwood',
  'FloorScore(r) Certified Flooring',
  'CRI Green Label Plus Certified Carpet',
];

const formatKey = (key) => {
  return key
    .toLowerCase() // Convert to lowercase
    .replace(/[^a-z0-9 ]/g, '') // Remove special characters
    .trim() // Trim whitespace from both ends of a string
    .replace(/ /g, '-'); // Replace spaces with hyphens
};

export const featuresObject = _features.reduce((acc, feature) => {
  const key = formatKey(feature);
  acc[key] = feature; // Set the original feature as the value
  return acc;
}, {});
