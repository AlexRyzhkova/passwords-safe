const inquirer = require("inquirer");
const fs = require("fs").promises;

const questions = [
  {
    type: "password",
    name: "password",
    message: "What's your master password?",
  },
  {
    type: "input",
    name: "key",
    message: "Which password do you need?",
  },
  //   {
  //     type: "list",
  //     name: "task",
  //     message: "What do you want to do?",
  //     choices: ["set", "get"],
  //   },
];

inquirer.prompt(questions).then(async (answers) => {
  if (answers.password === "123") {
    console.log("password correct");
    try {
      const passwordsJson = await fs.readFile("./password.json", "utf8");
      const passwords = JSON.parse(passwordsJson);
      console.log(`Your ${answers.key} password is ${passwords[answers.key]}`);
    } catch (error) {
      console.error("ERROR");
    }
  } else {
    console.log("wrong password!");
  }
});
// inquirer.prompt(questions).then(async (answers) => {
//     if (answers.task === "set") {
// console.log

//     }
