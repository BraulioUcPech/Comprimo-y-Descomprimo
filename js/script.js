document.getElementById("uploadButton").addEventListener("click", function () {
  const fileInput = document.getElementById("fileInput");
  const files = fileInput.files;

  const formData = new FormData();
  for (let i = 0; i < files.length; i++) {
    formData.append("files", files[i]);
  }

  fetch("/http://localhost:3000/index", {
    method: "POST",
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((error) => console.error("Error:", error));
});



document
  .getElementById("compressButton")
  .addEventListener("click", function () {
    const files = document.getElementById("fileInput").files;
    const zip = new JSZip();

    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      // Lee el archivo y lo añade al ZIP
      const reader = new FileReader();
      reader.onload = function (event) {
        zip.file(file.name, event.target.result);
        if (i === files.length - 1) {
          zip.generateAsync({ type: "blob" }).then(function (content) {
            saveAs(content, "archivo_comprimido.zip");
          });
        }
      };
      reader.readAsArrayBuffer(file);
    }
  });
document
  .getElementById("decompressButton")
  .addEventListener("click", function () {
    const file = document.getElementById("fileInput").files[0];
    const zip = new JSZip();

    JSZip.loadAsync(file).then(function (zip) {
      Object.keys(zip.files).forEach(function (filename) {
        zip.files[filename].async("blob").then(function (fileData) {
          saveAs(fileData, filename);
        });
      });
    });
  });
