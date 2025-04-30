// Função para falar a instrução
function falarInstrucao(texto) {
    if ('speechSynthesis' in window) {
        const utter = new SpeechSynthesisUtterance(texto);
        utter.lang = 'pt-BR';
        window.speechSynthesis.speak(utter);
    } else {
        alert('Seu navegador não suporta leitura de voz.');
    }
}
// Alternância de Pessoa Física/Jurídica e Representante obrigatoriamente para PJ
document.getElementById('tipoPessoaFisica').addEventListener('change', function() {
    const fisica = document.getElementById('dadosPessoaFisica');
    const juridica = document.getElementById('dadosPessoaJuridica');
    const representante = document.getElementById('dadosRepresentante');
    const sim = document.getElementById('possuiRepresentanteSim');
    const nao = document.getElementById('possuiRepresentanteNao');
    if (this.checked) {
        fisica.classList.remove('hidden');
        document.getElementById('tipoPessoaJuridica').checked = false;
        juridica.classList.add('hidden');
        // Permite escolher se tem representante
        sim.checked = false;
        nao.checked = true;
        representante.classList.add('hidden');
    } else {
        fisica.classList.add('hidden');
    }
});
document.getElementById('tipoPessoaJuridica').addEventListener('change', function() {
    const fisica = document.getElementById('dadosPessoaFisica');
    const juridica = document.getElementById('dadosPessoaJuridica');
    const representante = document.getElementById('dadosRepresentante');
    const sim = document.getElementById('possuiRepresentanteSim');
    const nao = document.getElementById('possuiRepresentanteNao');
    if (this.checked) {
        juridica.classList.remove('hidden');
        document.getElementById('tipoPessoaFisica').checked = false;
        fisica.classList.add('hidden');
        // Pessoa Jurídica sempre precisa de representante
        sim.checked = true;
        nao.checked = false;
        representante.classList.remove('hidden');
    } else {
        juridica.classList.add('hidden');
        // Permite esconder representante se não for PJ
        sim.checked = false;
        nao.checked = true;
        representante.classList.add('hidden');
    }
});

// Alternância de representante (radios)
document.getElementById('possuiRepresentanteSim').addEventListener('change', function() {
    // Só mostra se for marcado "Sim" e não for PJ (PJ já mostra sempre)
    const isPJ = document.getElementById('tipoPessoaJuridica').checked;
    if (!isPJ) {
        document.getElementById('dadosRepresentante').classList.toggle('hidden', !this.checked);
    }
});
document.getElementById('possuiRepresentanteNao').addEventListener('change', function() {
    // Só esconde se não for PJ (PJ já mostra sempre)
    const isPJ = document.getElementById('tipoPessoaJuridica').checked;
    if (!isPJ) {
        document.getElementById('dadosRepresentante').classList.toggle('hidden', this.checked);
    }
});

// Alternância de Averbação
document.getElementById('tipoAverbacao').addEventListener('change', function() {
    const tipoAverbacao = this.value;
    const averbacaoMatricula = document.getElementById('averbacaoMatricula');
    const averbacaoImovel = document.getElementById('averbacaoImovel');
    const averbacaoProprietario = document.getElementById('averbacaoProprietario');
    averbacaoMatricula.classList.add('hidden');
    averbacaoImovel.classList.add('hidden');
    averbacaoProprietario.classList.add('hidden');
    if (tipoAverbacao === 'matricula') {
        averbacaoMatricula.classList.remove('hidden');
    } else if (tipoAverbacao === 'imovel') {
        averbacaoImovel.classList.remove('hidden');
    } else if (tipoAverbacao === 'proprietario') {
        averbacaoProprietario.classList.remove('hidden');
    }
});

// Mostrar/ocultar textarea "Outros (descrever)" ao marcar o checkbox
document.getElementById('checkboxOutros').addEventListener('change', function() {
    const outrosDiv = document.getElementById('outrosDescricaoContainer');
    outrosDiv.classList.toggle('hidden', !this.checked);
});

// Máscara e validação CPF/CNPJ
function formatarCPF(cpf) {
    cpf = cpf.replace(/\D/g, "");
    cpf = cpf.slice(0, 11);
    if (cpf.length > 9) {
        return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{1,2})/, "$1.$2.$3-$4");
    } else if (cpf.length > 6) {
        return cpf.replace(/(\d{3})(\d{3})(\d{1,3})/, "$1.$2.$3");
    } else if (cpf.length > 3) {
        return cpf.replace(/(\d{3})(\d{1,3})/, "$1.$2");
    }
    return cpf;
}
function validarCPF(cpf) {
    cpf = cpf.replace(/\D/g, "");
    if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;
    let soma = 0, resto;
    for (let i = 1; i <= 9; i++) soma += parseInt(cpf.substring(i-1, i)) * (11 - i);
    resto = (soma * 10) % 11;
    if ((resto === 10) || (resto === 11)) resto = 0;
    if (resto !== parseInt(cpf.substring(9, 10))) return false;
    soma = 0;
    for (let i = 1; i <= 10; i++) soma += parseInt(cpf.substring(i-1, i)) * (12 - i);
    resto = (soma * 10) % 11;
    if ((resto === 10) || (resto === 11)) resto = 0;
    if (resto !== parseInt(cpf.substring(10, 11))) return false;
    return true;
}
function formatarCNPJ(cnpj) {
    cnpj = cnpj.replace(/\D/g, "");
    cnpj = cnpj.slice(0, 14);
    if (cnpj.length > 12) {
        return cnpj.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{1,2}).*/, "$1.$2.$3/$4-$5");
    } else if (cnpj.length > 8) {
        return cnpj.replace(/^(\d{2})(\d{3})(\d{3})(\d{1,4}).*/, "$1.$2.$3/$4");
    } else if (cnpj.length > 5) {
        return cnpj.replace(/^(\d{2})(\d{3})(\d{1,3}).*/, "$1.$2.$3");
    } else if (cnpj.length > 2) {
        return cnpj.replace(/^(\d{2})(\d{1,3}).*/, "$1.$2");
    }
    return cnpj;
}
function validarCNPJ(cnpj) {
    cnpj = cnpj.replace(/\D/g, "");
    if (cnpj.length !== 14) return false;
    if (/^(\d)\1+$/.test(cnpj)) return false;
    let tamanho = cnpj.length - 2;
    let numeros = cnpj.substring(0, tamanho);
    let digitos = cnpj.substring(tamanho);
    let soma = 0;
    let pos = tamanho - 7;
    for (let i = tamanho; i >= 1; i--) {
        soma += numeros.charAt(tamanho - i) * pos--;
        if (pos < 2) pos = 9;
    }
    let resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado != digitos.charAt(0)) return false;
    tamanho = tamanho + 1;
    numeros = cnpj.substring(0, tamanho);
    soma = 0;
    pos = tamanho - 7;
    for (let i = tamanho; i >= 1; i--) {
        soma += numeros.charAt(tamanho - i) * pos--;
        if (pos < 2) pos = 9;
    }
    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado != digitos.charAt(1)) return false;
    return true;
}

// CPF Pessoa Física
const cpfFisicaInput = document.querySelector('input[name="cpf_pessoa_fisica"]');
if (cpfFisicaInput) {
    cpfFisicaInput.addEventListener('input', function() {
        this.value = formatarCPF(this.value);
    });
    cpfFisicaInput.addEventListener('blur', function() {
        if (this.value && !validarCPF(this.value)) {
            this.style.borderColor = 'red';
            this.title = 'CPF inválido!';
        } else {
            this.style.borderColor = '';
            this.title = '';
        }
    });
}

// CPF Representante
const cpfRepresentanteInput = document.getElementById('cpfRepresentante');
if (cpfRepresentanteInput) {
    cpfRepresentanteInput.addEventListener('input', function() {
        this.value = formatarCPF(this.value);
    });
    cpfRepresentanteInput.addEventListener('blur', function() {
        if (this.value && !validarCPF(this.value)) {
            this.style.borderColor = 'red';
            this.title = 'CPF inválido!';
        } else {
            this.style.borderColor = '';
            this.title = '';
        }
    });
}

// CNPJ Pessoa Jurídica
const cnpjInput = document.querySelector('input[name="cnpj_pessoa_juridica"]');
if (cnpjInput) {
    cnpjInput.addEventListener('input', function() {
        this.value = formatarCNPJ(this.value);
    });
    cnpjInput.addEventListener('blur', function() {
        if (this.value && !validarCNPJ(this.value)) {
            this.style.borderColor = 'red';
            this.title = 'CNPJ inválido!';
        } else {
            this.style.borderColor = '';
            this.title = '';
        }
    });
}

// Exportar para PDF com validação de campos obrigatórios para Pessoa Física e Representante
document.getElementById('btnExportarPDF').addEventListener('click', function(e) {
    const isFisica = document.getElementById('tipoPessoaFisica').checked;
    const isJuridica = document.getElementById('tipoPessoaJuridica').checked;
    const isRepresentante = (
        isJuridica ||
        document.getElementById('possuiRepresentanteSim').checked
    );
    let camposInvalidos = [];

    // Pessoa Física
    if (isFisica) {
        const nome = document.querySelector('input[name="nome_pessoa_fisica"]');
        const cpf = document.querySelector('input[name="cpf_pessoa_fisica"]');
        const estadoCivil = document.querySelector('select[name="estado_civil_pessoa_fisica"]');
        const profissao = document.querySelector('input[name="profissao_pessoa_fisica"]');
        const rua = document.getElementById('ruaPessoaFisica');
        const numero = document.getElementById('numeroPessoaFisica');
        const bairro = document.getElementById('bairroPessoaFisica');
        const cidadeUf = document.getElementById('cidadeUfPessoaFisica');

        if (!nome.value.trim()) camposInvalidos.push('Nome (Pessoa Física)');
        if (!cpf.value.trim()) camposInvalidos.push('CPF (Pessoa Física)');
        if (!estadoCivil.value.trim()) camposInvalidos.push('Estado Civil (Pessoa Física)');
        if (!profissao.value.trim()) camposInvalidos.push('Profissão (Pessoa Física)');
        if (!rua.value.trim()) camposInvalidos.push('Rua (Pessoa Física)');
        if (!numero.value.trim()) camposInvalidos.push('Número (Pessoa Física)');
        if (!bairro.value.trim()) camposInvalidos.push('Bairro (Pessoa Física)');
        if (!cidadeUf.value.trim()) camposInvalidos.push('Cidade/UF (Pessoa Física)');
    }

    // Pessoa Jurídica (apenas os campos existentes)
    if (isJuridica) {
        const nome = document.querySelector('input[name="nome_pessoa_juridica"]');
        const cnpj = document.querySelector('input[name="cnpj_pessoa_juridica"]');
        const municipioUf = document.querySelector('input[name="municipio_uf_sede"]');

        if (!nome.value.trim()) camposInvalidos.push('Nome (Pessoa Jurídica)');
        if (!cnpj.value.trim()) camposInvalidos.push('CNPJ (Pessoa Jurídica)');
        if (!municipioUf.value.trim()) camposInvalidos.push('Município/UF da Sede (Pessoa Jurídica)');
    }

    // Representante (quando marcado, independente de PF/PJ)
    if (isRepresentante) {
        const nomeRep = document.querySelector('input[name="nome_representante"]');
        const cpfRep = document.getElementById('cpfRepresentante');
        const estadoCivilRep = document.querySelector('select[name="estado_civil_representante"]');
        const profissaoRep = document.querySelector('input[name="profissao_representante"]');
        const ruaRep = document.getElementById('ruaRepresentante');
        const numeroRep = document.getElementById('numeroRepresentante');
        const bairroRep = document.getElementById('bairroRepresentante');
        const cidadeUfRep = document.getElementById('cidadeUfRepresentante');

        if (!nomeRep.value.trim()) camposInvalidos.push('Nome (Representante)');
        if (!cpfRep.value.trim()) camposInvalidos.push('CPF (Representante)');
        if (!estadoCivilRep.value.trim()) camposInvalidos.push('Estado Civil (Representante)');
        if (!profissaoRep.value.trim()) camposInvalidos.push('Profissão (Representante)');
        if (!ruaRep.value.trim()) camposInvalidos.push('Rua (Representante)');
        if (!numeroRep.value.trim()) camposInvalidos.push('Número (Representante)');
        if (!bairroRep.value.trim()) camposInvalidos.push('Bairro (Representante)');
        if (!cidadeUfRep.value.trim()) camposInvalidos.push('Cidade/UF (Representante)');
    }

    // NOVO: Campo obrigatório para Nº Matrícula(s)
    const numeroMatricula = document.getElementById('numeroMatricula');
    if (!numeroMatricula.value.trim()) {
        camposInvalidos.push('Nº Matrícula(s)');
        numeroMatricula.style.borderColor = 'red';
    } else {
        numeroMatricula.style.borderColor = '';
    }

    if (camposInvalidos.length > 0) {
        e.preventDefault();
        alert('Preencha os seguintes campos obrigatórios antes de exportar para PDF:\n\n' + camposInvalidos.join('\n'));
        return;
    }

    alert('Selecione "Salvar como PDF" na janela de impressão para exportar o documento.');
    window.print();
});

// Pessoa Física - Busca CEP
document.getElementById('cepPessoaFisica')?.addEventListener('blur', function() {
    const cep = this.value.replace(/\D/g, '');
    if (cep.length === 8) {
        fetch(`https://viacep.com.br/ws/${cep}/json/`)
            .then(res => res.json())
            .then(data => {
                if (!data.erro) {
                    document.getElementById('ruaPessoaFisica').value = data.logradouro || '';
                    document.getElementById('bairroPessoaFisica').value = data.bairro || '';
                    document.getElementById('cidadeUfPessoaFisica').value =
                        (data.localidade || '') + (data.uf ? '/' + data.uf : '');
                }
            });
    }
});

// Representante - Busca CEP
document.getElementById('cepRepresentante')?.addEventListener('blur', function() {
    const cep = this.value.replace(/\D/g, '');
    if (cep.length === 8) {
        fetch(`https://viacep.com.br/ws/${cep}/json/`)
            .then(res => res.json())
            .then(data => {
                if (!data.erro) {
                    document.getElementById('ruaRepresentante').value = data.logradouro || '';
                    document.getElementById('bairroRepresentante').value = data.bairro || '';
                    document.getElementById('cidadeUfRepresentante').value =
                        (data.localidade || '') + (data.uf ? '/' + data.uf : '');
                }
            });
    }
});

// Preenche a data atual no formato "01 de abril de 2025"
document.addEventListener('DOMContentLoaded', function() {
    const meses = [
        "janeiro", "fevereiro", "março", "abril", "maio", "junho",
        "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"
    ];
    const hoje = new Date();
    const dia = String(hoje.getDate()).padStart(2, '0');
    const mes = meses[hoje.getMonth()];
    const ano = hoje.getFullYear();
    const dataAtual = document.getElementById('dataAtual');
    if (dataAtual) {
        dataAtual.textContent = `${dia} de ${mes} de ${ano}`;
    }
});

// Controle dos radios "SIM" e "NÃO" para reconhecimento de firma
document.addEventListener('DOMContentLoaded', function() {
    const sim = document.getElementById('reconhecerFirmaSim');
    const nao = document.getElementById('reconhecerFirmaNao');
    const atencao = document.getElementById('atencaoReconhecimento');
    const carimbo = document.getElementById('carimboCertifico');
    function toggleAtencaoCarimbo() {
        if (sim && sim.checked) {
            if (atencao) atencao.style.display = 'none';
            if (carimbo) carimbo.style.display = '';
        } else {
            if (atencao) atencao.style.display = 'inline';
            if (carimbo) carimbo.style.display = 'none';
        }
    }
    if (sim && nao) {
        sim.addEventListener('change', toggleAtencaoCarimbo);
        nao.addEventListener('change', toggleAtencaoCarimbo);
        toggleAtencaoCarimbo();
    }
});

function marcarCheckboxesNaoSelecionados() {
    document.querySelectorAll('input[type="checkbox"][name="averbacoes"]').forEach(function(checkbox) {
        if (!checkbox.checked) {
            checkbox.closest('label').classList.add('hide-on-print');
        } else {
            checkbox.closest('label').classList.remove('hide-on-print');
        }
    });
}

// Garante que a classe seja aplicada antes de imprimir/PDF
window.addEventListener('beforeprint', marcarCheckboxesNaoSelecionados);

// Também aplica ao exportar PDF via botão, para garantir
document.getElementById('btnExportarPDF').addEventListener('click', marcarCheckboxesNaoSelecionados);

// Sincroniza o checkbox "Outros" e exibe o textarea correto ao trocar o tipo de averbação
document.addEventListener('DOMContentLoaded', function() {
    const tipoAverbacao = document.getElementById('tipoAverbacao');
    const checkboxOutrosMatricula = document.querySelector('#averbacaoMatricula #checkboxOutros');
    const checkboxOutrosImovel = document.querySelector('#averbacaoImovel #checkboxOutros');
    const outrosDescricaoImovel = document.querySelector('#averbacaoImovel #outrosDescricaoContainer');

    // Ao trocar para "Matrícula oriunda da 1ª Serventia"
    tipoAverbacao.addEventListener('change', function() {
        if (this.value === 'imovel') {
            if (checkboxOutrosMatricula && checkboxOutrosMatricula.checked) {
                checkboxOutrosImovel.checked = true;
                outrosDescricaoImovel.classList.remove('hidden');
            } else {
                checkboxOutrosImovel.checked = false;
                outrosDescricaoImovel.classList.add('hidden');
            }
        }
    });

    // Ao clicar no "Outros" de Imóvel, mostra/esconde o textarea correspondente
    if (checkboxOutrosImovel) {
        checkboxOutrosImovel.addEventListener('change', function() {
            outrosDescricaoImovel.classList.toggle('hidden', !this.checked);
        });
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const simRep = document.getElementById('possuiRepresentanteSim');
    const naoRep = document.getElementById('possuiRepresentanteNao');
    const atencaoRep = document.getElementById('atencaoRepresentante');
    function toggleAtencaoRep() {
        const isPJ = document.getElementById('tipoPessoaJuridica').checked;
        if ((simRep && simRep.checked) || isPJ) {
            if (atencaoRep) atencaoRep.style.display = 'block';
        } else {
            if (atencaoRep) atencaoRep.style.display = 'none';
        }
    }
    if (simRep && naoRep && atencaoRep) {
        simRep.addEventListener('change', toggleAtencaoRep);
        naoRep.addEventListener('change', toggleAtencaoRep);
        // Também atualiza ao trocar PF/PJ
        document.getElementById('tipoPessoaFisica').addEventListener('change', toggleAtencaoRep);
        document.getElementById('tipoPessoaJuridica').addEventListener('change', toggleAtencaoRep);
        toggleAtencaoRep();
    }
});
