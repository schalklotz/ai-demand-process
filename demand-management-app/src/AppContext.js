import React, { createContext } from 'react'; // No change needed for createContext, useState, useEffect will be in App.js
import { sampleIdeasData, sampleProjectsData, sampleBacklogData } from './sampleData'; // Import sample data

export const AppContext = createContext();

// Helper function to initialize state from localStorage or sample data
export const initializeState = (key, sampleData) => {
  const localData = localStorage.getItem(key);
  if (localData) {
    try {
      const parsed = JSON.parse(localData);
      // Ensure it's an array; for 'ideas', 'projects', 'backlogItems', empty array is valid after initial load
      // but for the very first load, if it's an empty array string "[]" from a previous bad save,
      // we might want to repopulate with sample.
      // However, the prompt's refined logic for App.js useEffect handles repopulation better.
      // So here, if parsed data exists and is an array, use it.
      if (Array.isArray(parsed)) {
        return parsed;
      }
    } catch (e) {
      console.error(`Failed to parse ${key} from localStorage`, e);
      // Fallback to sampleData if parsing fails
      return sampleData;
    }
  }
  // If no localData, or if localData was not an array (implicitly handled by returning sampleData),
  // return sampleData. App.js useEffect will then persist this.
  return sampleData;
};


// Note: The actual useState and useEffect logic for managing these will be in App.js
// This file (AppContext.js) is primarily for creating the context and potentially exporting helpers
// if we decide to co-locate initialization logic here (though the prompt guides it into App.js).
// The `initializeState` function is defined here as per the thought process but will be used in App.js.
