import { issuesEmits } from "./issuesEmits.js"
import { infoDetails } from "./infoDetails.js";
export function processXml(xmlDoc) {
  cleanTable();

  const emits = xmlDoc.getElementsByTagName('emit');
  issuesEmits(emits);

  const dets = xmlDoc.getElementsByTagName('det');
  infoDetails(dets);
}

function cleanTable() {
  const xmlDataDiv = document.getElementById('xmlData');
  xmlDataDiv.innerHTML = '';
  const supplieDate = document.getElementById('suppleiDate');
  supplieDate.innerHTML = '';
}