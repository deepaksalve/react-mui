export const setItem = (key, val) => {
  try {
    localStorage.setItem(
      key,
      typeof val === "string" ? val : JSON.stringify(val)
    );
    return true;
  } catch (e) {}
};

export const getItem = (key) => {
  try {
    const val = localStorage.getItem(key);
    return JSON.parse(val);
  } catch (e) {}
};

export const removeItem = (key) => {
  try {
    localStorage.removeItem(key);
    return true;
  } catch (e) {}
};
