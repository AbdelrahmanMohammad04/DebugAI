import { createInterface } from "node:readline/promises";
import { stdin as input, stdout as output, env } from "node:process";
import { Configuration, OpenAIApi } from "openai";
import { read } from "node:fs";

const configuration = new Configuration({ apiKey: env.OPENAI_API_KEY });
const openai = new OpenAIApi(configuration);
const readline = createInterface({ input, output });

const chatbotType = await readline.question(
  "Hello, I am Abe, your AI debugger. What language are you using? "
);
const messages = [{ role: "system", content: chatbotType }];
let userInput = await readline.question("Great! How may I assist you? ");

async function testing(message) {
    while (userInput !== ".exit") {
        messages.push({ role: "user", content: message });
        try {
          const response = await openai.createChatCompletion({
            messages,
            model: "gpt-3.5-turbo",
          });
      
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
}

try {
    throw new Error("syntax error")
} catch (error) {
    testing(error.message)
}

