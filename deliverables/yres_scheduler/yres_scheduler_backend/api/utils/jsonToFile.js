const fs = require('fs');
const logger = require('./logger');

/**
 * Saves a JSON object to a file.
 * @param {Object} json - The JSON object to be saved.
 * @param {string} filePath - The path of the file to save the JSON to.
 */
function saveJsonToFile(json, filePath) {
  const jsonString = JSON.stringify(json);
  fs.writeFile(filePath, jsonString, (err) => {
    if (err) {
      logger.error('Error saving JSON to file:', err);
    } else {
      logger.debug('JSON saved to file:', filePath);
    }
  });
}

/**
 * Retrieves the JSON object from a file.
 * @param {string} filePath - The path of the file to retrieve the JSON from.
 * @returns {Object} - The JSON object retrieved from the file.
 */
async function getJsonFromFile(filePath) {
  const fileData = await fs.readFileSync(filePath, 'utf-8');
  const jsonObject = await JSON.parse(fileData);
  logger.debug('JSON retrieved from file:', filePath);
  return jsonObject;
}


async function clearJsonFromFile(filePath) {
  const fileData = await fs.readFileSync(filePath, 'utf-8');
  const jsonObject = await JSON.parse(fileData);
  logger.debug('JSON retrieved from file:', filePath);
  return jsonObject;
}

module.exports = {
  saveJsonToFile,
  getJsonFromFile
};