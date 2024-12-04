from flask import Flask, request, jsonify, render_template, send_from_directory, redirect, url_for
from openai import OpenAI
import os
from dotenv import load_dotenv

# Carregar variáveis de ambiente
load_dotenv()

app = Flask(__name__)

client = OpenAI()
client.api_key = os.getenv("OPENAI_API_KEY")

@app.route('/')
def index():
    return render_template('cadastro.html')
   
@app.route('/gerador', methods=['GET', 'POST'])
def gerador():
    if request.method == 'POST':
        # Receber dados do frontend (JSON)
        informacoes = request.json.get('coleta_')
        print(informacoes)

        # Criar a prompt para a API
        prompt = f"""
        Baseado nas seguintes informações fisiologicas,preferencia e restrições alimentares de um individuo: {informacoes},
        elabore um plano alimentar. Forneça as informações nutricionais(macronutrientes e valor calorico) de cada refeição elaborada.
        """

        # Chamar a API da OpenAI
        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "Você é um nutricionista especializado em dietas personalizadas."},
                {"role": "user", "content": prompt}
            ]
        )

        print(response)

        # Extrair o texto gerado
        ##dieta = response['choices'][0]['message']['content']

        # Retornar a dieta para o frontend
        return render_template('gerador.html')
    else:
        return render_template('gerador.html')

if __name__ == '__main__':
    app.run(debug=True)
