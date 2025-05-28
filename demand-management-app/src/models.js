// src/models.js

/**
 * @typedef {Object} Idea
 * @property {string} id - Unique identifier for the idea
 * @property {string} projectName - The name of the potential project
 * @property {string} problem - The problem statement
 * @property {string} solution - The proposed solution
 * @property {string} champion - The person championing the idea
 * @property {string} sponsor - The project sponsor
 * @property {string} status - Current status of the idea (e.g., "New", "In Review", "On Hold", "Approved")
 * @property {number} estCost - Estimated cost of the project
 * @property {string} costHorizon - Expected timeframe for costs (e.g., "Q1 2025", "H2 2026")
 * @property {string} timeHorizon - Expected timeframe for project completion (e.g., "Short-term", "Medium-term", "Long-term")
 * @property {number} perceivedValue - Subjective value score (e.g., 1-10)
 * @property {number} effort - Estimated effort (e.g., person-weeks or a numeric mapping of t-shirt sizes S/M/L/XL)
 * @property {number} confidence - Confidence in the idea's success/estimates (e.g., 0-100%)
 * @property {string} pitchDeckLink - URL to the pitch deck or related documents
 */

// Other models (Project, BacklogItem) will be defined here later.
