import "bootstrap";
import "regenerator-runtime/runtime";



(async () => {
    try {
      const fs = await import("browserify-fs");
      // const pdf = await import("pdfkit");

      // const data = await fs.readFile('./index.js');
      // console.log(data);
      console.log(fs);
      // console.log(pdf);
    } catch (e) {
      console.log(e);
    }
})()

// console.log(fs);