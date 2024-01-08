const path = require("node:path");

function modules(app) {
  return (
    app.get("/signature_pad.js", (req, res) => {
      res.contentType("application/javascript");
      res.sendFile(
        path.resolve("node_modules/signature_pad/dist/signature_pad.js")
      );
    }),
    app.get("/jspdf.umd.min.js", (req, res) => {
      res.contentType("application/javascript");
      res.sendFile(path.resolve("node_modules/jspdf/dist/jspdf.umd.min.js"));
    }),
    app.get("/html2canvas.js", (req, res) => {
      res.contentType("application/javascript");
      res.sendFile(
        path.resolve("node_modules/html2canvas/dist/html2canvas.js")
      );
    }),
    app.get("/jspdf.plugin.autotable.min.js", (req, res) => {
      res.contentType("application/javascript");
      res.sendFile(
        path.resolve(
          "node_modules/jspdf-autotable/dist/jspdf.plugin.autotable.min.js"
        )
      );
    })
  );
}

module.exports = modules;
