import { processXml } from "./processXml.js";

export function getXmlFile() {
  document.getElementById('xmlForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Impede o comportamento padrão de envio do formulário
  
    const fileInput = document.getElementById('xmlFile'); // pegando o arquivo xml
    const file = fileInput.files[0];
  
    if (file) {
      const reader = new FileReader();
  
      reader.onload = function (e) {
        const xmlString = e.target.result;
        const xmlDoc = new DOMParser().parseFromString(xmlString, 'text/xml');
        processXml(xmlDoc);
      };
  
      reader.readAsText(file);
    } else {
      alert('Envie um Arquivo XML');
    }
  });
}

