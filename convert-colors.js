const culori = require('culori');

function hslToOklch(h, s, l) {
  const color = culori.parse(`hsl(${h} ${s}% ${l}%)`);
  if (!color) return null;
  const oklch = culori.formatOklch(color);
  return oklch;
}

const colors = {
  brand1: [177, 54],
  brand2: [48, 80],
  brand3: [103, 12],
  brand1Dark: [177, 40],
  brand2Dark: [48, 64],
  brand3Dark: [103, 12]
};

const levels = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];
const lightnessMap = {
  50: 98, 100: 95, 200: 90, 300: 80, 400: 65,
  500: 50, 600: 40, 700: 30, 800: 20, 900: 15, 950: 10
};

for (const [name, [h, s]] of Object.entries(colors)) {
  console.log(`\n--- ${name} ---`);
  for (const level of levels) {
    const l = lightnessMap[level];
    console.log(`${level}: ${hslToOklch(h, s, l)}`);
  }
}

// Fixed values
console.log("\n--- Fixed Values ---");
console.log(`Background Light: ${hslToOklch(103, 12, 95)}`);
console.log(`Foreground Light: ${hslToOklch(177, 54, 10)}`);
console.log(`Background Dark: oklch(0.24 0.01 138.8)`); // Manual override for very dark
console.log(`Destructive Light: ${hslToOklch(0, 84, 32)}`);
console.log(`Destructive Dark: ${hslToOklch(0, 64, 32)}`);
