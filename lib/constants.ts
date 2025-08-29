/**
 * Application constants and configuration values
 */

// Learning and Progress Constants
export const LEARNING = {
  /** Default time spent per lesson in seconds (5 minutes) */
  DEFAULT_LESSON_TIME_SECONDS: 300,
  /** Points required per level */
  POINTS_PER_LEVEL: 100,
  /** Maximum conversation history to keep in memory */
  MAX_CONVERSATION_HISTORY: 100,
  /** Default CSAT category */
  DEFAULT_CSAT_CATEGORY: 'general',
} as const;

// Validation Constants
export const VALIDATION = {
  /** Minimum CSAT score */
  CSAT_SCORE_MIN: 1,
  /** Maximum CSAT score */
  CSAT_SCORE_MAX: 5,
} as const;

// UI Constants
export const UI = {
  /** Loading spinner sizes */
  LOADING_SIZE_SMALL: 'sm',
  LOADING_SIZE_MEDIUM: 'md',
  LOADING_SIZE_LARGE: 'lg',
} as const;

// Default values for forms and components
export const DEFAULTS = {
  /** Default locale for new users */
  USER_LOCALE: 'de',
  /** Default simulation scenario type */
  SIMULATION_SCENARIO: 'customer_complaint',
} as const;