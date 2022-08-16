const PDFDocument = require("pdfkit");
const fs = require("fs");
const doc = new PDFDocument();

module.exports = async (payload) => {
  doc.pipe(fs.createWriteStream(payload.outputPath));

  // Add an image, constrain it to a given size, and center it vertically and horizontally
  payload.config.forEach((config, index) => {
    if (index > 0) doc.addPage();
    if (config.page?.fontSize >= 0) doc.fontSize(config.page?.fontSize);
    if (config.page?.title) doc.text(config.page?.title, 50, 50);
    if (config.path)
      doc.image(config.path, {
        fit: config.pageSize || [519.53, 695.28],
        align: config.align || "left",
        valign: config.valign || "top",
      });
  });

  // Finalize PDF file
  doc.end();
};

// module.exports = async () => {
//   let payload = {
//     filePath: [
//       {
//         path: "test.png",
//         text: {
//           title: "Patient Info",
//           fontSize: "10",
//         },
//         pageSize: [519.53, 695.28],
//         align: "left",
//         vvalign: "top",
//       },
//       {
//         path: "test.png",
//         text: {
//           title: "Patient identity proof",
//           fontSize: "10",
//         },
//         pageSize: [519.53, 695.28],
//         align: "left",
//         vvalign: "top",
//       },
//     ],
//   };
//   const enterPath = path.join(__dirname, `/output/output1.pdf`);

//   doc.pipe(fs.createWriteStream("output/output1.pdf"));
//   // doc.pipe(fs.createWriteStream(enterPath));

//   // Add an image, constrain it to a given size, and center it vertically and horizontally
//   doc
//     .fontSize(10)
//     .text("Patient info", 50, 50)
//     .image("test.png", {
//       fit: [519.53, 695.28],
//       align: "left",
//       valign: "top",
//     });
//   doc
//     .addPage()
//     .fontSize(10)
//     .text("Patient identity proof", 50, 50)
//     .image("test1.jpg", {
//       fit: [519.53, 695.28],
//       align: "left",
//       valign: "top",
//     });
//   // Add another page
//   doc.addPage().fontSize(25).text("Here is some vector graphics...", 100, 100);
//   doc
//     .addPage()
//     .fillColor("blue")
//     .text("Here is a link!", 100, 100)
//     .underline(100, 100, 160, 27, { color: "#0000FF" })
//     .link(100, 100, 160, 27, "http://google.com/");

//   // Finalize PDF file
//   doc.end();
// };
