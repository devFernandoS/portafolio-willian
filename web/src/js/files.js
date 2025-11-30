
   document.getElementById("btnDescargarCVes").addEventListener("click", function () {    
          try {
             const link = document.createElement("a");
             link.href = "/CV Willian Fernando Sullca.pdf"; // archivo ubicado en web/public/cv.pdf
             link.download = "CV-Willian-Sullca.pdf";
             link.click();
          } catch (error) {
             console.log("Error descarga CV:");
             console.error("Error al descargar el CV:", error);   
          }
        
        });