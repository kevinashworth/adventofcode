fs = require("fs");
const filename = "input.txt";
const input = fs.readFileSync(__dirname + "/" + filename, "utf8");
const inputArray = input.split("\n");

let elfCalorieArray = [];
let elf = 1; // NB: The first elf is elf one, not elf zero.
let calories = 0;
inputArray.forEach((calorie) => {
  const cal = parseInt(calorie, 10);
  if (cal > -1) {
    calories += cal;
  } else {
    elfCalorieArray.push({ elf, calories });
    elf++;
    calories = 0;
  }
});

// reverse sort
function compare(a, b) {
  const aCal = a.calories;
  const bCal = b.calories;
  if (aCal > bCal) return -1;
  if (aCal < bCal) return 1;
  return 0;
}

const sortedElfCalorieArray = elfCalorieArray.sort(compare);
const most = sortedElfCalorieArray[0];

console.log("The elf with the most calories is elf number", most.elf);
console.log("The elf has", most.calories, "calories");

console.log(
  "The top 3 elves are",
  sortedElfCalorieArray[0],
  sortedElfCalorieArray[1],
  sortedElfCalorieArray[2]
);
console.log(
  "They have a total of",
  sortedElfCalorieArray[0].calories +
    sortedElfCalorieArray[1].calories +
    sortedElfCalorieArray[2].calories,
  "calories"
);
