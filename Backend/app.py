from flask import Flask, request, jsonify, render_template, send_from_directory, redirect, url_for
import openai
import os
from dotenv import load_dotenv

# Carregar variáveis de ambiente
load_dotenv()

app = Flask(__name__, template_folder=r'..\Frontend\PagesHTML')


# Configuração da API da OpenAI
openai.api_key = ""

# Rota para arquivos CSS
@app.route('/css/<path:filename>')
def serve_css(filename):
    return send_from_directory('../Frontend', filename)

# Rota para arquivos JS
@app.route('/js/<path:filename>')
def serve_js(filename):
    return send_from_directory('scripts', filename)

@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        return redirect(url_for('geradorDeCardapio'))
    else:
        return render_template('cadastro.html')
   
@app.route('/geradorDeCardapio', methods=['GET', 'POST'])
def geradorDeCardapio():
    if request.method == 'POST':
        # Receber dados do frontend (JSON)
        dados_fisiologicos = request.json.get('infoFisiologica')
        preferencias = request.json.get('preferencias')
        restricoes = request.json.get('restricoes')

        # Criar a prompt para a API
        prompt = f"""
        Baseado nos seguintes dados fisiológicos: {dados_fisiologicos},
        e considerando as preferências alimentares: {preferencias},
        e as restrições alimentares: {restricoes},
        elabore um plano alimentar diário com refeições equilibradas e detalhadas.
        """

        # Chamar a API da OpenAI
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "Você é um nutricionista especializado em dietas personalizadas."},
                {"role": "user", "content": prompt}
            ]
        )

        # Extrair o texto gerado
        dieta = response['choices'][0]['message']['content']

        # Retornar a dieta para o frontend
        return jsonify({'dieta': dieta})
    else:
        return render_template('geradorDeCardapio.html')

if __name__ == '__main__':
    app.run(debug=True)
