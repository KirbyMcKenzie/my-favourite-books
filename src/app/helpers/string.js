export const titleCase = (str) =>
  str.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase());
