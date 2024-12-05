// Aguarda o carregamento do DOM
document.addEventListener("DOMContentLoaded", () => {
    const atividadeSim = document.getElementById("atividadeSim");
    const atividadeNao = document.getElementById("atividadeNao");
    const atividadesCampo = document.getElementById("atividadesCampo");

    // Função para exibir ou ocultar o campo de atividades
    const toggleAtividades = () => {
        if (atividadeSim.checked) {
            atividadesCampo.style.display = "inline";
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
        const atividadesCheckboxes = document.querySelectorAll('input[name="atividadeF"]:checked');
        atividadesSelecionadas = Array.from(atividadesCheckboxes).map((el) => {
            const frequenciaInput = el.parentElement.querySelector('input[type="number"]');
            const frequencia = frequenciaInput ? frequenciaInput.value || "0" : "0";
            return `${el.value} (${frequencia} vezes/semana)`;
        });
    }

    // Verifica se todos os campos obrigatórios estão preenchidos
    if (idade && peso && altura && genero && atividade) {
        // Monta o resultado
        let resultado = `
            Idade: ${idade} anos
            Peso: ${peso} kg
            Altura: ${altura} cm
            Gênero: ${genero}
            Pratica atividade física: ${atividade === "sim" ? "Sim" : "Não"}
        `;

        if (atividade === "sim" && atividadesSelecionadas.length > 0) {
            resultado += `Atividades: ${atividadesSelecionadas.join(", ")}`;
        }

        // Manda o resultado para a proxima pagina
        sessionStorage.setItem("infoFisiologica", resultado);     
        window.location.href = "gerador";   

    } else {
        alert("Preencha todos os campos corretamente!");
    }

});


