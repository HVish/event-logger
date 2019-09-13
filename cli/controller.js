const chalk = require("chalk");

const { formatDate } = require("./utils");
const dataFetcher = require("./data-fetcher");

const BASE_URL = process.env.BASE_URL || "http://localhost:5000";

/**
 * Event log
 * @typedef {Object} EventLog
 * @property {string} _id - log mongo id
 * @property {string} details - log details
 * @property {string[]} tags - tags for grouping logs
 * @property {Date|string} createdAt - creation date or ISO string of log
 */

/**
 * send event data to event-logger server
 * @param {EventLog} event event data object
 */
async function logEvent(event) {
  await dataFetcher({
    uri: `${BASE_URL}/events`,
    method: "POST",
    json: event
  });
}

/**
 * get all logged events from server
 */
async function getAllEvents() {
  const { body } = await dataFetcher({
    uri: `${BASE_URL}/events`,
    method: "GET",
    json: true
  });
  body.forEach(event => {
    const { _id, details, tags, createdAt } = event;
    const date = formatDate(createdAt);

    console.log(chalk.green(`[${date}]`), chalk.cyan(`${details}`));
    console.log(chalk.gray(`LogId: ${_id}`));

    if (tags.length) {
      console.log(chalk.gray(`Tags: ${tags.join()}\n`));
    } else {
      console.log();
    }
  });
}

module.exports = {
  logEvent,
  getAllEvents
};
