fs = require("fs");
const filename = "input.txt";
const input = fs.readFileSync(__dirname + "/" + filename, "utf8");
const signals = input.split("\n");

// signals.forEach((s) => console.log(s));
// console.log(signals);

const newSignals = signals.map((s) => {
  if (s === "noop") {
    return { cmd: "noop" };
  } else {
    return { cmd: "addx", X: parseInt(s.substring(s.lastIndexOf(" ") + 1)) };
  }
});
// newSignals.forEach((s, i) => console.log(i, s));

const cycles = [{ cycle: 1, value: 1 }];
let currentCycle = 1;
let currentValue = 1;

newSignals.forEach((s) => {
  if (s.cmd === "noop") {
    const cycle = currentCycle++;
    const value = currentValue;
    cycles.push({
      cycle,
      value,
    });
  } else {
    const { X } = s;
    let cycle = currentCycle++;
    let value = currentValue;
    let strength = cycle * value;
    cycles.push({
      cycle,
      value,
    });
    cycle = currentCycle++;
    value = currentValue;
    strength = cycle * value;
    cycles.push({
      cycle,
      value,
    });
    currentValue += X;
  }
});

cycles.forEach((s) => {
  s.column = (s.cycle - 1) % 40;
  s.pixel = Math.abs(s.column - s.value) < 2;
  // console.log(s);
});

const crt = [];
for (let row = 0; row < 6; row++) {
  let pixels = "";
  for (let col = 0; col < 40; col++) {
    pixels += cycles[row * 40 + col].pixel ? "#" : ".";
  }
  crt[row] = pixels;
}

console.log(crt);
