/**
 * Load state from localStorage
 * @param {string} key - localStorage key
 * @returns {any} Parsed state or undefined if not found
 */
export const loadState = (key) => {
  try {
    const serializedState = localStorage.getItem(key);
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    console.error('Failed to load state from localStorage:', err);
    return undefined;
  }
};

/**
 * Save state to localStorage
 * @param {string} key - localStorage key
 * @param {any} state - State to save
 */
export const saveState = (key, state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem(key, serializedState);
  } catch (err) {
    console.error('Failed to save state to localStorage:', err);
  }
};

/**
 * Remove item from localStorage
 * @param {string} key - localStorage key
 */
export const removeState = (key) => {
  try {
    localStorage.removeItem(key);
  } catch (err) {
    console.error('Failed to remove state from localStorage:', err);
  }
};
