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
newSignals.forEach((s, i) => console.log(i, s));

const cycles = [{ cycle: 1, value: 1, strength: 0 }];
let currentCycle = 1;
let currentValue = 1;

newSignals.forEach((s) => {
  if (s.cmd === "noop") {
    const cycle = currentCycle++;
    const value = currentValue;
    const strength = cycle * value;
    cycles.push({
      cycle,
      value,
      strength,
    });
  } else {
    const { X } = s;
    let cycle = currentCycle++;
    let value = currentValue;
    let strength = cycle * value;
    cycles.push({
      cycle,
      value,
      strength,
    });
    cycle = currentCycle++;
    value = currentValue;
    strength = cycle * value;
    cycles.push({
      cycle,
      value,
      strength,
    });
    currentValue += X;
  }
});

let sum = 0;
for (i = 20; i < cycles.length; i += 40) {
  sum += cycles[i].strength;
  console.log(cycles[i], sum);
}

cycles.forEach((s) => console.log(s));
