const chalk = require("chalk");

const { formatDate } = require("./utils");
const dataFetcher = require("./data-fetcher");

const BASE_URL = process.env.BASE_URL || "http://localhost:5000";

/**
 * send details to event-logger server
 * @param {string} details details of the event
 */
async function logEvent(details) {
  await dataFetcher({
    uri: `${BASE_URL}/events`,
    method: "POST",
    json: { details }
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
    const date = chalk.blue(formatDate(event.createdAt));
    const details = chalk.gray(event.details);
    console.log(`${date}: ${details}`);
  });
}

module.exports = {
  logEvent,
  getAllEvents
};
