const request = require("request");
const ora = require("ora");

const BASE_URL = process.env.BASE_URL || "http://localhost:5000";

/**
 * send details to event-logger server
 * @param {string} details details of the event
 */
function logEvent(details) {
  let chunkSize = 0;
  let receivedChunk = 0;

  const requestConfig = {
    uri: `${BASE_URL}/events`,
    method: "POST",
    json: { details }
  };

  const spinner = ora("Requesting server...").start();

  /**
   * Update the progress
   * @param {number} delta difference to increase the chunk received
   */
  const updateProgress = delta => {
    receivedChunk += delta;
    spinner.text = `Progress: ${receivedChunk}/${chunkSize}`;
  };

  const requestHandler = (err, response, body) => {
    if (err) {
      spinner.fail(err.message || "Unable to log this event");
      return;
    }
    if (response.statusCode >= 200 && response.statusCode < 300) {
      spinner.succeed("Done.");
      return;
    }
    spinner.warn(body.message || JSON.stringify(body));
  };

  const progressHandler = res => {
    chunkSize = parseInt(res.headers["content-length"], 10);
    res.on("data", chunk => updateProgress(chunk.length));
  };

  request(requestConfig, requestHandler).on("response", progressHandler);
}

module.exports = {
  logEvent
};
