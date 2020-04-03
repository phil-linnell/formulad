const getNumber = sides => {
  return (getNumber.number = sides[Math.floor(Math.random() * sides.length)]) === getNumber.lastNumber ? getNumber(sides) : getNumber.lastNumber = getNumber.number;
}

export default getNumber;