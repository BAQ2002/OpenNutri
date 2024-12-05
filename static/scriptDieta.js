// Texto de entrada (pode ser recebido de forma dinâmica)

const inputText = document.getElementById('resposta').textContent;
        
function processMeals(text) {
    const container = document.getElementById('meals-container');

    // Separar refeições e informações nutricionais
    const mealSections = text.match(/#### Refeição \d+:.*?(?=(#### Refeição \d+:|### Informações Nutricionais))/gs);
    const nutritionSections = text.match(/- Refeição \d+: .*/g);

    if (!mealSections || !nutritionSections) {
        container.innerHTML = "<p>Erro ao processar o texto.</p>";
        return;
    }

    mealSections.forEach((meal, index) => {
        const mealDiv = document.createElement('div');
        mealDiv.className = 'meal';

        // Adicionar título
        const title = document.createElement('h4');
        title.textContent = `Refeição ${index + 1}`;
        mealDiv.appendChild(title);

        // Adicionar opções
        const options = meal.match(/- Opção \d+: .*/g);
        const optionsList = document.createElement('ul');
        options.forEach(option => {
            const optionItem = document.createElement('li');
            optionItem.textContent = option.replace(/- /, '');
            optionsList.appendChild(optionItem);
        });
        mealDiv.appendChild(optionsList);

        // Adicionar informações nutricionais
        const nutritionalInfo = document.createElement('div');
        nutritionalInfo.className = 'nutritional-info';
        nutritionalInfo.textContent = nutritionSections[index].replace(/- /, '');
        mealDiv.appendChild(nutritionalInfo);

        // Adicionar ao container
        container.appendChild(mealDiv);
    });
}

// Chamar a função para processar o texto
processMeals(inputText);