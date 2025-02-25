import { BaseRequest } from '../base/WesternBaseTypes';

/**
 * Request parameters for chart interpretation API
 * Extends the BaseRequest with optional language parameter
 */
export interface ChartInterpretationRequest extends BaseRequest {
  /**
   * Optional language code for the interpretation text
   * Default is 'en' for English
   */
  language?: string;
  
  /**
   * Optional house system to use for the chart calculation
   * Default is 'placidus'
   */
  house_type?: 'placidus' | 'koch' | 'topocentric' | 'poryphry' | 'equal_house' | 'whole_sign';
} 