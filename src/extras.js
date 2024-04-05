const fs = require('fs');
const xml2js = require('xml2js');

// Função para ler o arquivo XML e extrair as porcentagens do ICMS e do IPI para cada produto
function extrairPorcentagensICMSeIPI(nomeArquivo) {
    fs.readFile(nomeArquivo, 'utf-8', (err, data) => {
        if (err) {
            console.error('Erro ao ler o arquivo XML:', err);
            return;
        }

        // Parseia o XML
        xml2js.parseString(data, (err, result) => {
            if (err) {
                console.error('Erro ao parsear o XML:', err);
                return;
            }

            // Acessa os detalhes dos produtos
            const produtos = result.NFe.infNFe.det;

            // Itera sobre os produtos e extrai as porcentagens do ICMS e do IPI
            produtos.forEach(produto => {
                const porcentagemICMS = produto.imposto[0].ICMS[0].ICMS00[0].pICMS[0];
                const porcentagemIPI = produto.imposto[0].IPI[0].IPITrib[0].pIPI[0];

                // Aqui você pode fazer o que desejar com as porcentagens do ICMS e do IPI de cada produto
                console.log('Porcentagem do ICMS para o produto:', porcentagemICMS);
                console.log('Porcentagem do IPI para o produto:', porcentagemIPI);
            });
        });
    });
}

// Exemplo de uso
const arquivoXML = 'caminho/do/seu/arquivo.xml';
extrairPorcentagensICMSeIPI(arquivoXML);



const fs = require('fs');
const xml2js = require('xml2js');

// Função para ler o arquivo XML e extrair as porcentagens do ICMS e do IPI
function extrairPorcentagensICMSeIPI(nomeArquivo) {
    fs.readFile(nomeArquivo, 'utf-8', (err, data) => {
        if (err) {
            console.error('Erro ao ler o arquivo XML:', err);
            return;
        }

        // Parseia o XML
        xml2js.parseString(data, (err, result) => {
            if (err) {
                console.error('Erro ao parsear o XML:', err);
                return;
            }

            // Acessa a porcentagem do ICMS e do IPI
            const porcentagemICMS = result.NFe.infNFe.det.imposto[0].ICMS[0].ICMS00[0].pICMS[0];
            const porcentagemIPI = result.NFe.infNFe.det.imposto[0].IPI[0].IPITrib[0].pIPI[0];

            // Aqui você pode fazer o que desejar com as porcentagens do ICMS e do IPI
            console.log('Porcentagem do ICMS:', porcentagemICMS);
            console.log('Porcentagem do IPI:', porcentagemIPI);
        });
    });
}

// Exemplo de uso
const arquivoXML = 'caminho/do/seu/arquivo.xml';
extrairPorcentagensICMSeIPI(arquivoXML);
const fs = require('fs');
const xml2js = require('xml2js');

// Função para ler o arquivo XML e extrair as porcentagens do ICMS e IPI
function extrairPorcentagensICMSeIPI(nomeArquivo) {
    fs.readFile(nomeArquivo, 'utf-8', (err, data) => {
        if (err) {
            console.error('Erro ao ler o arquivo XML:', err);
            return;
        }

        // Parseia o XML
        xml2js.parseString(data, (err, result) => {
            if (err) {
                console.error('Erro ao parsear o XML:', err);
                return;
            }

            // Acessa as porcentagens do ICMS e do IPI
            const porcentagemICMS = parseFloat(result.NFe.infNFe.det.imposto[0].ICMS[0].ICMS00[0].pICMS[0]);
            const porcentagemIPI = parseFloat(result.NFe.infNFe.det.imposto[0].IPI[0].IPITrib[0].pIPI[0]);

            // Aqui você pode fazer o que desejar com as porcentagens do ICMS e do IPI
            console.log('Porcentagem do ICMS:', porcentagemICMS);
            console.log('Porcentagem do IPI:', porcentagemIPI);
        });
    });
}

// Exemplo de uso
const arquivoXML = 'caminho/do/seu/arquivo.xml';
extrairPorcentagensICMSeIPI(arquivoXML);

// Função para ler o arquivo XML e extrair as porcentagens do ICMS e do IPI
function extrairPorcentagensICMSeIPI() {
    const xmlhttp = new XMLHttpRequest();
    const arquivoXML = 'caminho/do/seu/arquivo.xml'; // Substitua pelo caminho do seu arquivo XML

    xmlhttp.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            const xmlDoc = this.responseXML;
            const produtos = xmlDoc.getElementsByTagName('det');

            for (let i = 0; i < produtos.length; i++) {
                const produto = produtos[i];
                const porcentagemICMS = produto.getElementsByTagName('pICMS')[0].textContent;
                const porcentagemIPI = produto.getElementsByTagName('pIPI')[0].textContent;

                // Adiciona os dados na tabela HTML
                adicionarLinhaTabela(produto.id, porcentagemICMS, porcentagemIPI);
            }
        }
    };

    xmlhttp.open('GET', arquivoXML, true);
    xmlhttp.send();
}

// Função para adicionar uma linha na tabela HTML
function adicionarLinhaTabela(produto, porcentagemICMS, porcentagemIPI) {
    const tabela = document.getElementById('corpoTabela');
    const novaLinha = tabela.insertRow();

    const celulaProduto = novaLinha.insertCell();
    celulaProduto.textContent = produto;

    const celulaICMS = novaLinha.insertCell();
    celulaICMS.textContent = porcentagemICMS;

    const celulaIPI = novaLinha.insertCell();
    celulaIPI.textContent = porcentagemIPI;
}

// Chamada da função para extrair as porcentagens do ICMS e do IPI
extrairPorcentagensICMSeIPI();