from flask import Flask, request, jsonify, render_template, send_from_directory, redirect, url_for, session
import openai
from openai import OpenAI
import os
import ast
from dotenv import load_dotenv

# Carregar variáveis de ambiente
load_dotenv()

app = Flask(__name__)
app.secret_key = os.getenv("OPENAI_API_KEY")
openai.api_key = os.getenv("OPENAI_API_KEY")

@app.route('/')
def index():
    return render_template('cadastro.html')
   
@app.route('/gerador', methods=['GET', 'POST'])
def gerador():
    if request.method == 'POST':
        # Receber dados do frontend (JSON)
        informacoes = request.json.get('coleta_')
        #print(informacoes)

        # Criar a prompt para a API
        prompt = f"""
        Baseado nas seguintes informações fisiologicas,preferencia e restrições alimentares de um individuo: {informacoes},
        elabore um plano alimentar. Forneça: o gasto calorico aproximado deste individuo, o superavite/deficite calorico necessario para alcançar o objetivo especificado,
        a quantidade em gramas que deve ser usada de cada alimento nas refeições elaboradas e
        as informações nutricionais(macronutrientes e valor calorico) de cada refeição elaborada.
        A sua resposta deve seguir como referencia a seguinte estrutura, sendo o simbolo "..." onde você deve colocar as informações desejadas:
        #### Refeição 1:
        - Opção 1: ...gramas de ... com ...gramas de ...
        - Opção 2: ...gramas de ... com ...gramas de ...
        - Opção ... ...

        #### Refeição 2:
        - Opção 1: ...gramas de ... com ...gramas de ...
        - Opção 2: ...gramas de ... com ...gramas de ...
        - Opção ... ...

        #### Refeição 3:
        - Opção 1: ...gramas de ... com ...gramas de ...
        - Opção 2: ...gramas de ... com ...gramas de ...
        - Opção ... ...

        #### Refeição ...:
        - Opção 1: Frango refogado com legumes
        - Opção 2: Ovos cozidos
        - Opção ... ...

        ### Informações Nutricionais (valores aproximados por refeição):
        - Refeição 1: Proteínas: ...g, Carboidratos: ...g, Gorduras: ...g, Calorias: ...kcal
        - Refeição 2: Proteínas: ...g, Carboidratos: ...g, Gorduras: ...g, Calorias: ...kcal
        - Refeição 3: Proteínas: ...g, Carboidratos: ...g, Gorduras: ...g, Calorias: ...kcal
        - Refeição ...: Proteínas: ...g, Carboidratos: ...g, Gorduras: ...g, Calorias: ...kcal
        - ... ... ... ... ...
        """

        # Chamar a API da OpenAI
        response = openai.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "Você é um nutricionista especializado em dietas personalizadas."},
                {"role": "user", "content": prompt}
            ]
        )
        # Extrair o texto gerado
        raw_dieta  = response.choices[0].message.content
        dietaGerada = raw_dieta.strip()

        session['dietaGerada'] = dietaGerada
        return jsonify({"redirect": url_for('dieta')})

    else: 
        return render_template('gerador.html')
    
@app.route('/dieta')
def dieta():
    dieta_gerada = session.get('dietaGerada', "Nenhuma dieta gerada ainda.")
    return render_template('dieta.html', dieta=dieta_gerada)

   
if __name__ == '__main__':
    app.run(debug=True)
