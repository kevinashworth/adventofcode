fs = require("fs");
const filename = "input.txt";
const input = fs.readFileSync(__dirname + "/" + filename, "utf8");
const rucksacksArray = input.split("\n");

let sharedItemsArray = [];

rucksacksArray.forEach((rucksack) => {
  const compartment1 = rucksack.slice(0, rucksack.length / 2);
  const compartment2 = rucksack.slice(rucksack.length / 2, rucksack.length);
  let sharedItem;
  for (i = 0; i <= rucksack.length / 2; i++) {
    const item = compartment1.charAt(i);
    if (compartment2.indexOf(item) > -1) {
      sharedItem = item;
      sharedItemsArray.push(item);
      break;
    }
  }
});
let prioritiesSum = 0;

const allItemsArray = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

sharedItemsArray.forEach((item) => {
  const value = allItemsArray.indexOf(item) + 1;
  prioritiesSum += value;
});

console.log(prioritiesSum);

const badgesArray = [];

for (i = 0; i < rucksacksArray.length; i += 3) {
  const rucksack1 = rucksacksArray[i];
  const rucksack2 = rucksacksArray[i + 1];
  const rucksack3 = rucksacksArray[i + 2];
  for (i1 = 0; i1 < rucksack1.length; i1++) {
    const item = rucksack1.charAt(i1);
    if (rucksack2.indexOf(item) > -1 && rucksack3.indexOf(item) > -1) {
      badgesArray.push(item);
      break;
    }
  }
}

let badgesSum = 0;
badgesArray.forEach((item) => {
  const value = allItemsArray.indexOf(item) + 1;
  badgesSum += value;
});

console.log(badgesSum);
