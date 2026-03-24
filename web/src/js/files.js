
document.getElementById("btnDescargarCVes").addEventListener("click", function () {
   try {
      const link = document.createElement("a");
      link.href = "/CV_Willian Fernando_Sullca_FS.pdf"; // archivo ubicado en web/public/cv.pdf
      link.download = "CV_Willian_Fernando_Sullca_FullStack.pdf";
      link.click();
   } catch (error) {
      console.log("Error descarga CV:");
      console.error("Error al descargar el CV:", error);
   }

});



document.getElementById("btnDescargarCVen").addEventListener("click", function () {
   try {
      const link = document.createElement("a");
      link.href = "/CV_Willian Fernando_Sullca_FullStack_EN.pdf"; // archivo ubicado en web/public/cv.pdf
      link.download = "CV_Willian_Fernando_Sullca_FullStack_EN.pdf";
      link.click();
   } catch (error) {
      console.log("Error descarga CV:");
      console.error("Error al descargar el CV:", error);
   }

});