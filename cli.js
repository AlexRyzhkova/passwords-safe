const {
  askStartQuestions,
  askGetPasswordQuestions,
  askSetPasswordQuestions,
  CHOICE_GET,
  CHOICE_SET,
} = require("./lib/questions");
const { readPassword, writePassword } = require("./lib/passwords");
const { encrypt } = require("./lib/crypto");

async function main() {
  const { masterPassword, action } = await askStartQuestions();

  if (masterPassword === "123") {
    console.log("Master Password is correct!");
    if (action === CHOICE_GET) {
      console.log("Now Get a password");
      const { key } = await askGetPasswordQuestions();
      try {
        const password = await readPassword(key);

        console.log(`Your ${key} password is ${password}`);
      } catch (error) {
        console.error("ERROR!");
      }
    } else if (action === CHOICE_SET) {
      console.log("Now Set a password");
      const { key, password } = await askSetPasswordQuestions();
      const encryptedPassword = encrypt(password, masterPassword);
      await writePassword(key, encryptedPassword);
      console.log(`New Password set`);
    }
  } else {
    console.log("wrong Master Password");
  }
}

main();
