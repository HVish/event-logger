const request = require("request");
const ora = require("ora");

/**
 * Wrapper for request library with spinner
 * @param {any} config request config object
 * @param {Function} callback
 */
function dataFetcher(config, callback) {
  let chunkSize = 0;
  let receivedChunk = 0;

  const spinner = ora("Requesting server...").start();

  /**
   * Update the progress
   * @param {number} delta difference to increase the chunk received
   */
  const updateProgress = delta => {
    receivedChunk += delta;
    spinner.text = `Progress: ${receivedChunk}/${chunkSize}`;
  };

  const progressHandler = res => {
    chunkSize = parseInt(res.headers["content-length"], 10);
    res.on("data", chunk => updateProgress(chunk.length));
  };

  const requestHandler = (err, response, body) => {
    // stop spinner
    if (err) {
      spinner.fail(err instanceof Error ? err.toString() : JSON.stringify(err));
    } else if (response.statusCode >= 200 && response.statusCode < 300) {
      spinner.succeed("Done.");
    } else {
      spinner.warn(body.message || JSON.stringify(body));
    }

    // callback after request completion
    if (callback && typeof callback === "function") {
      callback(err, response, body);
    }
  };

  request(config, requestHandler).on("response", progressHandler);
}

module.exports = config => {
  return new Promise((resolve, reject) => {
    dataFetcher(config, (err, request, body) => {
      if (err) return reject(err);
      resolve({ request, body });
    });
  });
};
