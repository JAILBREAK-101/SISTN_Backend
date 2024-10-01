const PDFDocument = require("pdfkit");

// PDF Creator
const createPDF = (data, text) => {
    return new Promise((resolve, reject) => {
      const doc = new PDFDocument();
      const buffers = [];
  
      doc.on("data", buffers.push.bind(buffers));
      doc.on("end", () => {
        const pdfData = Buffer.concat(buffers);
        resolve(pdfData);
      });
  
      // Write content to PDF
      doc.fontSize(14).text(text, { align: "center" });
      doc.moveDown();
      doc.fontSize(12);
  
      // Add the data from the request body to the PDF
      for (const [key, value] of Object.entries(data)) {
        doc.text(`${key}: ${value}`);
      }
  
      doc.end();
    });
  };

module.exports = { createPDF };
  