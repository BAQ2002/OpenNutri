import openai

# Configurar a chave da API
openai.api_key = "sua-chave-de-api-aqui"

# Dados do usuário
informacoes_fisiologicas = {
    "peso": 70,
    "altura": 1.75,
    "idade": 30,
    "atividade_fisica": "moderada"
}
preferencias_alimentares = {
    "restricoes": ["sem lactose"],
    "preferencias": ["vegetariano"]
}

# Prompt para o GPT
prompt = f"""
Você é um nutricionista virtual. Com base nas informações abaixo, forneça recomendações alimentares personalizadas:

Informações Fisiológicas:
- Peso: {informacoes_fisiologicas['peso']}kg
- Altura: {informacoes_fisiologicas['altura']}cm
- Idade: {informacoes_fisiologicas['idade']} anos
- Nível de atividade física: {informacoes_fisiologicas['atividade_fisica']}

Preferências Alimentares:
- Restrições: {', '.join(preferencias_alimentares['restricoes'])}
- Preferências: {', '.join(preferencias_alimentares['preferencias'])}

Recomendações:
"""

# Chamada à API
response = openai.ChatCompletion.create(
    model="gpt-3.5-turbo",
    messages=[{"role": "user", "content": prompt}]
)

# Exibir a resposta
print(response['choices'][0]['message']['content'])
