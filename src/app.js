const browserFs = require("browserify-fs");
const PDFDocument = require("pdfkit").default;
const path = require("path");
const blobStream = require("blob-stream");
import fs from 'fs';
import Helvetica from "!!raw-loader!pdfkit/js/data/Helvetica.afm";
import HelveticaBold from "!!raw-loader!pdfkit/js/data/Helvetica-Bold.afm";

window.fs = fs;
window.path = path;
window.browserFs = browserFs;
window.blobStream = blobStream;

let content;

export const activateInputs = () => {
  $(".form-control").each((index, input) => {
    let field = input.id;
    $(input).on("input", () => {
      $(`.${field}`).each((idx, item) => $(item).text($(input).val().trim()));
      content = document.getElementById("letter").innerText;
    });
  });
  
  console.log(fs);
  console.log(browserFs);
};

export const activatePDF = () => {
  fs.writeFileSync("data/Helvetica.afm", Helvetica);
  fs.writeFileSync("data/Helvetica-Bold.afm", HelveticaBold);

  $("#link").on("click", (e) => {
    makePdf(`${$("#Company").val().trim()}_CL`, content);
    // e.currentTarget.click();
  }
  );
}

const plugText = "Denizen Confidant (https://denizen-confidant.herokuapp.com)";

function makePdf(title, text) {
  text = text.split(plugText);
  const pdfDoc = new PDFDocument();
  const consideration = text[1].match("Thank you for your consideration").index;
  // pdfDoc.pipe(
  //   // browserFs.createWriteStream(`/Users/nahuelgorosito/Desktop/${title}.pdf`)
  //   browserFs.createWriteStream(`/${title}.pdf`)
  // );
  const stream = pdfDoc.pipe(blobStream());
  window.stream = stream;

  pdfDoc
    .fontSize(24)
    .font("Helvetica-Bold")
    .fill("#666666")
    .text("Nahuel Gorosito", 140, 72, {
      continued: true,
      characterSpacing: -1,
    })
    .fontSize(14)
    // .fill("#848181")
    .fill("#aba9a9")
    .strokeColor("#848181")
    .text("Full Stack Software Engineer", 158, 77, {
      characterSpacing: -1,
    });

  pdfDoc.rect(320, 68, 2, 28).fillAndStroke("#666666", "#848181");

  pdfDoc
    .font("Helvetica", 13)
    .fill("#000")
    .moveDown(1)
    .text(text[0], 56, 120, {
      paragraphGap: 4,
      indent: 10,
      width: 512,
      continued: true,
    })
    .fillColor("#6b96c2")
    .font("Helvetica", 13)
    .link(
      pdfDoc.x,
      pdfDoc.y + 14,
      pdfDoc.widthOfString("Denizen Confidant"),
      pdfDoc.currentLineHeight(),
      "https://denizen-confidant.herokuapp.com"
    )
    .text("Denizen Confidant", { continued: true })
    .font("Helvetica", 13)
    .fill("#000")
    .text(text[1].slice(0, consideration), {
      paragraphGap: 4,
      indent: 10,
      width: 512,
    });

  pdfDoc
   .font("Helvetica", 14)
   .text(text[1].slice(consideration), {
     paragraphGap: 2,
     indent: 0
   });

  pdfDoc
    // .moveDown(0.2)
    .font("Helvetica-Bold", 15)
    .fill("#666666")
    .fillOpacity(0.7)
    .text("Nahuel Gorosito", {
      indent: 0,
    });

  pdfDoc.end();
  stream.on('finish', () => {
    const link = document.links[1];
    link.href = stream.toBlobURL('application/pdf');
    link.download = `${title}.pdf`;
  });
  console.log(title);
}
