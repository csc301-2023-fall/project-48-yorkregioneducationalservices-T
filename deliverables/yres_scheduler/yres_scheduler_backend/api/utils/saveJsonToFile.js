const fs = require('fs');

/**
 * Saves a JSON object to a file.
 * @param {Object} json - The JSON object to be saved.
 * @param {string} filePath - The path of the file to save the JSON to.
 */
export default function saveJsonToFile(json, filePath) {
  const jsonString = JSON.stringify(json);
  fs.writeFile(filePath, jsonString, (err) => {
    if (err) {
      console.error('Error saving JSON to file:', err);
    } else {
      console.log('JSON saved to file:', filePath);
    }
  });
}

/**
 * Retrieves the JSON object from a file.
 * @param {string} filePath - The path of the file to retrieve the JSON from.
 * @returns {Object} - The JSON object retrieved from the file.
 */
export default function getJsonFromFile(filePath) {
  const fileData = fs.readFileSync(filePath, 'utf-8');
  const jsonObject = JSON.parse(fileData);
  return jsonObject;
}
