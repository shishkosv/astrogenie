export interface WesternChartRequest {
  day: number;        // 1-31
  month: number;      // 1-12
  year: number;       // e.g., 1990
  hour: number;       // 0-23
  min: number;        // 0-59
  lat: number;        // Latitude (-90 to 90)
  lon: number;        // Longitude (-180 to 180)
  tzone: number;      // Timezone offset (-12 to 14)
  house_type?: 'placidus' | 'koch' | 'topocentric' | 'poryphry' | 'equal_house' | 'whole_sign';
} 