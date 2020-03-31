import multiply from "../utils/multiply";

const dice = [
  {
    gear: "1",
    type: "d4",
    description: "1 - 2",
    sides: [1, 1, 2, 2]
  },
  {
    gear: "2",
    type: "d6",
    description: "2 - 4",
    sides: [2, 3, 3, 4, 4, 4]
  },
  {
    gear: "3",
    type: "d8",
    description: "4 - 8",
    sides: [4, 5, 6, 6, 7, 7, 8, 8]
  },
  {
    gear: "4",
    type: "d12",
    description: "7 - 12",
    sides: multiply([7, 8, 9, 10, 11, 12])
  },
  {
    gear: "5",
    type: "d20",
    description: "11 - 20",
    sides: multiply([11, 12, 13, 14, 15, 16, 17, 18, 19, 20])
  },
  {
    gear: "6",
    type: "d30",
    description: "21 - 30",
    sides: multiply([21, 22, 23, 24, 25, 26, 27, 28, 29, 30], 3)
  },
  {
    gear: "damage",
    type: "damage",
    description: "1 - 20",
    sides: [...Array(20).keys()].map(i => i + 1)
  }
];

export default dice;