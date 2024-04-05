export function issuesEmits(emits) {
  for (const emit of emits) {
    const supplieDate = document.getElementById('suppleiDate');
    const xNome = emit.getElementsByTagName('xNome')[0].textContent;
    const cnpj = emit.getElementsByTagName('CNPJ')[0].textContent;
    const uf = emit.getElementsByTagName('UF')[0].textContent;

    const createDate = document.createElement('p');
    createDate.textContent = `Fornecedor: ${xNome} | CNPJ: ${cnpj} | Estado: ${uf}`;

    supplieDate.appendChild(createDate);
  }
}