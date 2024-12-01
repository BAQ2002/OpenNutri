// script.js

// Aguarda o carregamento do DOM
document.addEventListener("DOMContentLoaded", () => {
    const atividadeSim = document.getElementById("atividadeSim");
    const atividadeNao = document.getElementById("atividadeNao");
    const atividadesCampo = document.getElementById("atividadesCampo");

    // Função para exibir ou ocultar o campo de atividades
    const toggleAtividades = () => {
        if (atividadeSim.checked) {
            atividadesCampo.style.display = "block";
        } else {
            atividadesCampo.style.display = "none";
        }
    };

    // Adiciona eventos aos botões de rádio
    atividadeSim.addEventListener("change", toggleAtividades);
    atividadeNao.addEventListener("change", toggleAtividades);

    // Garante o estado correto no carregamento da página
    toggleAtividades();
});

// Manipula o envio do formulário
document.getElementById("formCadastro").addEventListener("submit", function (event) {
    event.preventDefault(); // Previne o recarregamento da página

    // Obtém os dados do formulário
    const idade = document.getElementById("idade").value;
    const peso = document.getElementById("peso").value;
    const altura = document.getElementById("altura").value;
    const genero = document.getElementById("genero").value;
    const atividade = document.querySelector('input[name="atividade"]:checked')?.value;

    // Verifica as atividades selecionadas (se visível)
    let atividadesSelecionadas = [];
    if (atividade === "sim") {
        atividadesSelecionadas = Array.from(
            document.querySelectorAll('input[name="atividadeF"]:checked')
        ).map((el) => el.value);
    }

    // Verifica se todos os campos obrigatórios estão preenchidos
    if (idade && peso && altura && genero && atividade) {
        // Monta o resultado
        let resultado = `
            Usuário cadastrado com sucesso! <br>
            <strong>Idade:</strong> ${idade} anos<br>
            <strong>Peso:</strong> ${peso} kg<br>
            <strong>Altura:</strong> ${altura} cm<br>
            <strong>Gênero:</strong> ${genero}<br>
            <strong>Pratica atividade física:</strong> ${atividade === "sim" ? "Sim" : "Não"}<br>
        `;

        if (atividade === "sim" && atividadesSelecionadas.length > 0) {
            resultado += `<strong>Atividades:</strong> ${atividadesSelecionadas.join(", ")}<br>`;
        }

        // Exibe o resultado
        document.getElementById("resultado").innerHTML = resultado;
    } else {
        alert("Preencha todos os campos corretamente!");
    }
});
