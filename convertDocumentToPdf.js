const libre = require("libreoffice-convert");
const path = require("path");
const fs = require("fs").promises;
let lib_convert = require("util").promisify(libre.convert);

async function convertFileToPdf(payload) {
  try {
    let data = await fs.readFile(payload.inputFilePath);
    let done = await lib_convert(data, ".pdf", undefined);
    await fs.writeFile(payload.outputFilePath, done);
    return { success: true, fileName: payload.outputFilePath };
  } catch (err) {
    console.log(err);
    return { success: false };
  }
}

module.exports = async (list) => {
  for (const item of list) {
    const contents = await await convertFileToPdf(item);
    console.log(contents);
  }
};
