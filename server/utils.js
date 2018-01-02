const needed = [
  "temp",
  "place",
];

export const places = [
  "helsinki",
  "tokyo",
  "ny",
  "amsterdam",
  "dubai"
];

export function validate(obj) {
  let proper = true;
  needed.forEach(prop => {
    if(!Object.prototype.hasOwnProperty.call(obj, prop)) {
      proper = false;
    }
  })
  return proper;
}

export function validPlace(place) {
  return (places.indexOf(place) > -1)
}

export function hasProp(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop)
}
