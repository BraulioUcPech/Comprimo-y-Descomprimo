const express = require("express");
const multer = require("multer");
const app = express();
const port = 3000;

// Configura multer para almacenar archivos subidos
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Asegúrate de que este directorio ya exista
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage: storage });

// Ruta GET para la raíz del servidor
app.get("/", (req, res) => {
  res.send(
    "Servidor de compresión y descompresión de archivos está funcionando!"
  );
});

// Ruta POST para subir archivos
app.post("/upload", upload.array("files"), (req, res) => {
  console.log("Archivos recibidos:", req.files);
  res.json({ message: "Archivos subidos correctamente" });
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
