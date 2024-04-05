export function infoDetails(dets) {
  const table = createTableWithHeaders([
    'Produto',
    'NCM',
    'ICMS',
    'IPI',
    'Valor Unitário',
    'Valor Final c/ Imposto',
  ]);

  const xmlDataDiv = document.getElementById('xmlData');
  xmlDataDiv.innerHTML = ''; // Clear previous data
  for (const det of dets) {
    const xProd = getTextContent(det, 'xProd');
    const ncm = getTextContent(det, 'NCM');
    const icms = Number(getTextContent(det, 'pICMS'));
    const ipi = Number(getTextContent(det, 'pIPI'));
    const vProd = Number(getTextContent(det, 'vUnCom'));

    const row = table.insertRow();
    row.insertCell().textContent = xProd;
    row.insertCell().textContent = ncm;
    row.insertCell().textContent = icms.toFixed(1);
    row.insertCell().textContent = ipi;
    row.insertCell().textContent = vProd.toFixed(2);

    const finalPriceCell = row.insertCell();
    const finalPrice = calculateFinalPrice(icms, vProd, ipi);
    finalPriceCell.textContent = finalPrice.toFixed(2);
  }

  xmlDataDiv.appendChild(table);
}

function createTableWithHeaders(headers) {
  const table = document.createElement('table');
  const headerRow = table.insertRow();
  headers.forEach(header => {
    const headerCell = headerRow.insertCell();
    headerCell.textContent = header;
  });
  return table;
}

function getTextContent(element, tagName) {
  const tagElement = element.getElementsByTagName(tagName)[0];
  return tagElement ? tagElement.textContent : '';
}

function calculateFinalPrice(icms, vProd, ipi) {
  const icmsBA = 20.50
  let rateIpi = ((ipi / 100) * vProd) + vProd
  let gapIcms = ((icmsBA - icms) / 100) * vProd
  let result = rateIpi + gapIcms
  return result
} 