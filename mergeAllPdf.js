const PDFMerger = require("pdf-merger-js");

module.exports = async ({ files, outputFilePath }) => {
  let merger = new PDFMerger();
  for (const file of files) {
    const contents = await merger.add(file);
    console.log(contents);
  }
  return await merger.save(outputFilePath);
};
