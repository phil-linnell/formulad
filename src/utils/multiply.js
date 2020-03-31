export default (array, multiple) => {
  return array.reduce((acc, cur) => {
    if (multiple === 3) {
      return acc.concat([cur, cur, cur]);
    }
    return acc.concat([cur, cur]);
  }, []);
}