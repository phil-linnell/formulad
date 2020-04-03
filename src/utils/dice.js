import multiply from "../utils/multiply";

const dice = [
  {
    gear: 1,
    type: "d4",
    colour: "#fbdc4b",
    description: "1 - 2",
    sides: [1, 1, 2, 2],
    sfx: '../assets/d4.m4a'
  },
  {
    gear: 2,
    type: "d6",
    colour: "#e7873b",
    description: "2 - 4",
    sides: [2, 3, 3, 4, 4, 4],
    sfx: '../assets/d6.m4a'
  },
  {
    gear: 3,
    type: "d8",
    colour: "#da3731",
    description: "4 - 8",
    sides: [4, 5, 6, 6, 7, 7, 8, 8],
    sfx: '../assets/d8.m4a'
  },
  {
    gear: 4,
    type: "d12",
    colour: "#49a159",
    description: "7 - 12",
    sides: multiply([7, 8, 9, 10, 11, 12]),
    sfx: '../assets/d12.m4a'
  },
  {
    gear: 5,
    type: "d20",
    colour: "#85338a",
    description: "11 - 20",
    sides: multiply([11, 12, 13, 14, 15, 16, 17, 18, 19, 20]),
    sfx: '../assets/20.m4a'
  },
  {
    gear: 6,
    type: "d30",
    colour: "#205ca4",
    description: "21 - 30",
    sides: multiply([21, 22, 23, 24, 25, 26, 27, 28, 29, 30], 3),
    sfx: '../assets/20.m4a'
  },
  {
    gear: 0,
    type: "damage",
    colour: "#111111",
    description: "1 - 20",
    sides: [...Array(20).keys()].map(i => i + 1),
    sfx: '../assets/20.m4a'
  }
];

export default dice;