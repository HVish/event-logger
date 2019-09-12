#!/usr/bin/env node

const program = require("commander");
const { prompt } = require("inquirer");

const { logEvent } = require("./controller");

program.version("1.0.0").description("Event logging system");

const questions = [
  {
    type: "input",
    name: "details",
    message: "Enter log message:"
  }
];

program
  .command("log")
  .description("Log an event")
  .action(async () => {
    try {
      const answers = await prompt(questions);
      logEvent(answers.details);
    } catch (err) {
      console.log(err);
    }
  });

program.parse(process.argv);
