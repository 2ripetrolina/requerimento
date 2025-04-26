# Requerimento - 2º Registro de Imóveis de Petrolina

Este projeto é um formulário digital para geração de requerimentos ao 2º Registro de Imóveis da Comarca de Petrolina – PE. Permite o preenchimento de dados de pessoa física, jurídica e representante, seleção de tipos de averbação e exportação do documento para PDF.

## Funcionalidades

- Alternância entre Pessoa Física e Jurídica
- Máscara e validação de CPF/CNPJ
- Busca automática de endereço pelo CEP (ViaCEP)
- Inclusão de dados de representante, se necessário
- Seleção de tipos de averbação conforme matrícula, imóvel ou proprietário
- Botão para exportar o formulário preenchido para PDF (via impressão do navegador)
- Instruções detalhadas para preenchimento

## Estrutura do Projeto

- [`index.html`](index.html): Página principal com o formulário.
- [`style.css`](style.css): Estilos para o formulário e responsividade.
- [`script.js`](script.js): Lógica de alternância, máscaras, validação e integração com ViaCEP.

## Tecnologias

- HTML5
- CSS3
- JavaScript (Vanilla)

## Observações

- O botão "Exportar para PDF" utiliza a funcionalidade de impressão do navegador. Recomenda-se escolher "Salvar como PDF" na janela de impressão.
- O preenchimento do endereço pelo CEP depende do serviço [ViaCEP](https://viacep.com.br/).

