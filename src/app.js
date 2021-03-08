const fs = require("browserify-fs");
// import "browserify-fs";
// const PDFDocument = require("pdfkit");


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
};

$("#link").on("click", () =>
  makePdf(`${$("#Company").val().trim()}_CL`, content)
);

const plugText = "Denizen Confidant (https://denizen-confidant.herokuapp.com),";

function makePdf(title, text) {
  text = text.split(plugText);
  const pdfDoc = new PDFDocument();
  window.pdfDoc = pdfDoc;

  pdfDoc.pipe(
    fs.createWriteStream(`/Users/nahuelgorosito/Desktop/${title}.pdf`)
  );

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
    .moveDown(2)
    .text(text[0], 56, 150, {
      paragraphGap: 10,
      indent: 10,
      width: 512,
      continued: true,
    })
    .fillColor("#6b96c2")
    .font("Helvetica", 13)
    .link(
      368,
      pdfDoc.y,
      pdfDoc.widthOfString("Denizen Confidant"),
      pdfDoc.currentLineHeight(),
      "https://denizen-confidant.herokuapp.com"
    )
    .text("Denizen Confidant", { continued: true })
    .font("Helvetica", 13)
    .fill("#000")
    .text(text[1], {
      paragraphGap: 10,
      indent: 10,
      width: 512,
    });

  pdfDoc
    .font("Helvetica-Bold", 15)
    .fill("#666666")
    .fillOpacity(0.7)
    .text("Nahuel Gorosito", {
      indent: 10,
    });

  pdfDoc.end();
}
