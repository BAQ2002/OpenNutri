// Simula o estado de login do usuário
const user = {
    isLoggedIn: true, // Altere para false para simular um usuário não logado
    name: "João" // Nome do usuário logado
};

const userActions = document.getElementById("user-actions");

if (user.isLoggedIn) {
    // Usuário logado
    userActions.innerHTML = `
        <span>Seja bem-vindo, ${user.name}</span>
        <button onclick="editAccount()">Editar Conta</button>
        <button onclick="logout()">Deslogar</button>
    `;
} else {
    // Usuário não logado
    userActions.innerHTML = `
        <button onclick="login()">Login</button>
    `;
}

function login() {
    alert("Redirecionando para a página de login...");
}

function logout() {
    alert("Você foi deslogado.");
    // Aqui você pode redirecionar para a página de login ou atualizar o estado de login
}

function editAccount() {
    alert("Redirecionando para a página de edição de conta...");
}

document.getElementById('redirect-button-GeradorDeCardapio').addEventListener('click', function() {
    // Redireciona para a página desejada
    window.location.href = 'geradorDeCardapio.html';
});