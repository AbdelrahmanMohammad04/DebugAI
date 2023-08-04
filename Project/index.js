import { createInterface } from "node:readline/promises"
import { stdin as input, stdout as output, env } from "node:process"
import { Configuration, OpenAIApi } from "openai"
import prompts from "prompts"
import * as fs from 'fs'

const configuration = new Configuration({ apiKey: env.OPENAI_API_KEY })
const openai = new OpenAIApi(configuration)
const readline = createInterface({ input, output })

let AIhelper = {
  name: "Abe",
  greetingMessage: function() {
    return `Hello, I am ${this.name}, your AI debugger! What language are you using? `
  }
}

let userInput = await readline.question(AIhelper.greetingMessage())
const messages = [{ role: "assistant", content: userInput }]

let request

function read(file, cb) {
  fs.readFile(file, 'utf8', function(err, data) {
    if (!err) {
        cb(data.toString().split('\\'+'n'))
    } else {
        console.log(err)
    }
  });
}

let text
read('C:/Users/12623/vs_code_projects/CapitalOne-CLI-Project/Project/'+'PasteCodeHere.js', function(data) {
  text = data.toString()
})

try {
  function badFunction(a, b) {
    return a / b
  }
  badFunction(1n, 0n)
} catch (error) {
  let response = await readline.question('Should I automatically detect the problem? ')
  if (response.toString().toUpperCase() === "YES") {
    request = error.message
  } else {
    response = await readline.question('Describe your error: ')
    request = response.toString()
  }
}

messages.push({ role: "user", content: `help me debug ${request} in ${userInput}` })

while (userInput !== ".exit") {
  try {
    const response = await openai.createChatCompletion({
      messages,
      model: "gpt-3.5-turbo",
    });
    if (userInput === ".getCode") {
      messages.push({ role: "user", content: "Here is my broken code: \n"+text })
      console.log(messages[messages.length-1].content)
    }
    const botMessage = response.data.choices[0].message;
    if (botMessage) {
      messages.push(botMessage);
      userInput = await readline.question("\n" + botMessage.content + "\n\n");
    } else {
      userInput = await readline.question("\nNo response, try asking again\n");
    }
  } catch (error) {
    console.log(error.message);
    userInput = await readline.question("\nSomething went wrong, try asking again\n");
  }
}
readline.close()

const response = await prompts({
  type: 'number',
  name: 'value',
  message: 'How would you rate your experience? 1 for worst, 10 for best.',
  validate: value => value <= 10 && value >= 1 ? true : 'Between 1 and 10'
});

