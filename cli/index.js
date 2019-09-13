#!/usr/bin/env node

const program = require("commander");
const { prompt } = require("inquirer");

const { logEvent, getAllEvents } = require("./controller");

program.version("1.0.0").description("Event logging system");

const questions = [
  {
    type: "input",
    name: "details",
    message: "Enter log message:",
    validate: details => {
      return !!details || "This field is required!";
    }
  },
  {
    type: "input",
    name: "tags",
    message: "Enter comma separated tags (optional):"
  }
];

program
  .command("log")
  .description("Log an event")
  .action(async () => {
    try {
      const answers = await prompt(questions);

      // convert tags to array
      answers.tags = answers.tags
        .replace(/,(\s)*/g, ",")
        .split(",")
        .filter(Boolean);

      await logEvent(answers);
    } catch (err) {
      console.log(err);
    }
  });

// TODO: add support for pagination, last N events, select and edit
program
  .command("list")
  .description("List all logged events")
  .action(async () => {
    try {
      await getAllEvents();
    } catch (err) {
      console.log(err);
    }
  });

program.parse(process.argv);
