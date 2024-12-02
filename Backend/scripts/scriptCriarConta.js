document.getElementById('signup-form').addEventListener('submit', async function (event) {
    event.preventDefault(); // Impede o envio do formulário inicialmente

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
    const errorMessage = document.getElementById('error-message');

    // Validação de senha
    if (password !== confirmPassword) {
        errorMessage.textContent = "As senhas não coincidem.";
        return; // Sai da função sem enviar o formulário
    } else {
        errorMessage.textContent = ""; // Limpa a mensagem de erro
    }

    // Verifica se o email é válido e existente
    const emailIsValid = await validateEmail(email);
    if (!emailIsValid) {
        errorMessage.textContent = "Email inválido ou inexistente.";
        return;
    }

    // Envia o email de confirmação
    const emailSent = await sendConfirmationEmail(email);
    if (!emailSent) {
        errorMessage.textContent = "Erro ao enviar email. Tente novamente mais tarde.";
        return;
    }

    // Redireciona para outra página após o sucesso
    window.location.href = "paginaDeSucesso.html";
});

// Função para validar o email
async function validateEmail(email) {
    try {
        const response = await fetch(`https://api.ficticia.com/verify-email?email=${encodeURIComponent(email)}`);
        const data = await response.json();
        return data.isValid; // A API deve retornar um campo "isValid" (exemplo fictício)
    } catch (error) {
        console.error("Erro ao validar o email:", error);
        return false;
    }
}

// Função para enviar email de confirmação
async function sendConfirmationEmail(email) {
    try {
        const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                service_id: 'seu_service_id',
                template_id: 'seu_template_id',
                user_id: 'seu_user_id',
                template_params: {
                    to_email: email,
                    message: "Bem-vindo! Sua conta foi criada com sucesso."
                }
            })
        });
        return response.ok; // Retorna true se o envio foi bem-sucedido
    } catch (error) {
        console.error("Erro ao enviar o email:", error);
        return false;
    }
}
