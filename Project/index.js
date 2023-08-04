import { createInterface } from "node:readline/promises"
import { stdin as input, stdout as output, env } from "node:process"
import { Configuration, OpenAIApi } from "openai"
import prompts from "prompts"

const configuration = new Configuration({ apiKey: env.OPENAI_API_KEY })
const openai = new OpenAIApi(configuration)
const readline = createInterface({ input, output })

const userInput = await readline.question(
  "Hello, I am Abe, your AI debugger. How may I assist you? "
)
const messages = [{ role: "assistant", content: userInput }]
let languageInput = await readline.question(`Great! What language are you using? `)

async function testing(message) {  
  while (userInput !== ".exit") {
      messages.push({ role: "user", content: `${userInput} ${message} in ${languageInput}` })
      console.log(messages[messages.length-1].content)
      try {
        const response = await openai.createChatCompletion({
          messages,
          model: "gpt-3.5-turbo",
        })
    
        const botMessage = response.data.choices[0].message
        if (botMessage) {
          messages.push(botMessage)
          userInput = await readline.question("\n" + botMessage.content + "\n\n")
        } else {
          userInput = await readline.question("\nNo response, try asking again\n")
        }
      } catch (error) {
        console.log(error.message)
        userInput = await readline.question("\nSomething went wrong, try asking again\n")
      }
    }
    readline.close()
}

try {
  throw new Error(`#!/bin/bash

  $PWD/python3-virtualenv/bin/python -m unittest discover -v tests/
  
  ramie@Rami-PC MINGW64 ~/MLH/portfolio/my-fork/mlh-sre-portfolio (main)
  $ ./run-test.sh 
  ./run-test.sh: line 3: /c/Users/ramie/MLH/portfolio/my-fork/mlh-sre-portfolio/python3-virtualenv/bin/python: No such file or directory`)
} catch (error) {
  let response = await prompts({
    type: 'toggle',
    name: 'detection',
    message: 'Looks like you ran into an error, should I automatically detect?',
    initial: true,
    active: 'yes',
    inactive: 'no'
  })
  if (response['detection']) {
    testing(error.message)
  } else {
    response = await prompts({
      type: 'text',
      name: 'manual',
      message: 'Describe your error.'
    })
    console.log(response['manual'])
    testing(response['manual'])
  }
}

