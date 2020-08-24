// console.log("Hallo");
//import readline from "readline"
const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

readline.question(`What's your password?`, (password) => {
  console.log(`You password is ${password}!`);
  hideEchoBack: true;
  readline.close();
});
