// let baseIcmsTest = document.getElementById('icmsBase').value
let baseIcms = document.getElementById('icmsBase')
let valueIcms = parseFloat(baseIcms.value)

// Função para lidar com o envio do formulário
document.getElementById('xmlForm').addEventListener('submit', function (event) {
  event.preventDefault() // Impede o comportamento padrão de envio do formulário

  const fileInput = document.getElementById('xmlFile') // pegando o arquivo xml
  const file = fileInput.files[0]

  if (file) {
    const reader = new FileReader()

    reader.onload = function (e) {
      const xmlString = e.target.result
      const xmlDoc = new DOMParser().parseFromString(xmlString, 'text/xml')

      const xmlDataDiv = document.getElementById('xmlData')
      xmlDataDiv.innerHTML = '' // Limpa os dados anteriores

      const dets = xmlDoc.getElementsByTagName('det')
      const emits = xmlDoc.getElementsByTagName('emit')

      const table = document.createElement('table')
      const headerRow = table.insertRow()
      const prodHeader = headerRow.insertCell()
      const ncmHeader = headerRow.insertCell()
      const icmsHeader = headerRow.insertCell()
      const vProdHeader = headerRow.insertCell()
      const finalPriceHeader = headerRow.insertCell()

      prodHeader.textContent = 'Produto'
      ncmHeader.textContent = 'NCM'
      icmsHeader.textContent = 'ICMS'
      vProdHeader.textContent = 'Valor Unitário'
      finalPriceHeader.textContent = 'Valor Final c/ Imposto'

      for (const emit of emits) {
        const supplieDate = document.getElementById('suppleiDate')
        supplieDate.innerHTML = ''

        const xNome = emit.getElementsByTagName('xNome')[0].textContent
        const cnpj = emit.getElementsByTagName('CNPJ')[0].textContent

        const createDate = document.createElement('p')
        createDate.textContent = `Fornecedor : ${xNome} | CNPJ: ${cnpj}`

        supplieDate.appendChild(createDate)
      }

      for (const det of dets) {
        const xProd = det.getElementsByTagName('xProd')[0].textContent
        const ncm = det.getElementsByTagName('NCM')[0].textContent
        const icms = det.getElementsByTagName('pICMS')[0].textContent
        const vProd = det.getElementsByTagName('vUnCom')[0].textContent

        if (parseFloat(icms) >= 19) {
          const finalPrice =
            (parseFloat(vProd) * parseFloat(icms)) / 100 + parseFloat(vProd)

          const row = table.insertRow()
          const prodCell = row.insertCell()
          const ncmCell = row.insertCell()
          const icmsCell = row.insertCell()
          const vProdCell = row.insertCell()
          const finalPriceCell = row.insertCell()

          prodCell.textContent = xProd
          ncmCell.textContent = ncm
          icmsCell.textContent = icms
          vProdCell.textContent = parseFloat(vProd)
          finalPriceCell.textContent = Math.round(finalPrice).toFixed(2)

          xmlDataDiv.appendChild(table)
        } else {
          let baseIcms = document.getElementById('icmsBase')
          let valueIcms = parseFloat(baseIcms.value)

          const differenceIcms = valueIcms - parseFloat(icms)

          const priceIcms =
            (parseFloat(vProd) * parseFloat(icms)) / 100 + parseFloat(vProd)
          const finalPrice = (priceIcms * differenceIcms) / 100 + priceIcms

          const row = table.insertRow()
          const prodCell = row.insertCell()
          const ncmCell = row.insertCell()
          const icmsCell = row.insertCell()
          const vProdCell = row.insertCell()
          const finalPriceCell = row.insertCell()
          prodCell.textContent = xProd
          ncmCell.textContent = ncm
          icmsCell.textContent = icms
          vProdCell.textContent = parseFloat(vProd)
          finalPriceCell.textContent = Math.round(finalPrice).toFixed(2)
          xmlDataDiv.appendChild(table)
        }
      }
    }
    reader.readAsText(file)
  } else {
    alert('Envie um Arquivo XML')
  }
})
