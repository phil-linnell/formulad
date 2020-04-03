export default number => {
  // NOTE: only for numbers up to 20

  let ordinalIndicator = "th";
  if (number < 1) {
    ordinalIndicator = "";
  }
  if (number === 1) {
    ordinalIndicator = "st";
  }
  if (number === 2) {
    ordinalIndicator = "nd";
  }
  if (number === 3) {
    ordinalIndicator = "rd";
  }

  return `${number}${ordinalIndicator}`;
}