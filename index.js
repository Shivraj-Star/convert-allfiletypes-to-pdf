function isAuthor(name) {
  return name === "shivraj" ? true : false;
}

module.exports = {
  convertImagetoPdf: require("./convertImagetoPdf"),
  mergeAllPdf: require("./mergeAllPdf"),
  convertDocumentToPdf : require('./convertDocumentToPdf')
};
