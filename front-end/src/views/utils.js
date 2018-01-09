const places = [
  "helsinki",
  "tokyo",
  "ny",
  "amsterdam",
  "dubai"
];

const capitalize = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export {places, capitalize}
