const baseURL = 'https://aprende-js-546c8a7e0a7f.herokuapp.com/api/listar';

const methodNameElement = document.getElementById('method-name');
const methodDescriptionElement = document.getElementById('method-description');
const methodExampleElement = document.getElementById('method-example');
const pre = document.getElementById('pre-container');
const btn = document.getElementById('btn-container');

const generateMethod = async () => {
  methodNameElement.innerHTML = '';
  methodDescriptionElement.innerHTML = `<div id="div-loading-container">
  <svg id="loading" viewBox="25 25 50 50">
    <circle cx="50" cy="50" r="20"></circle>
  </svg>
  </div>`;
  methodExampleElement.innerHTML = '';
  methodExampleElement.style.display = 'block';
  pre.style.display = 'none';
  btn.style.display = 'none';

  try {
    const response = await fetch(baseURL);
    if (!response.ok) {
      throw new Error('Erro na resposta da API');
    }
    
    const data = await response.json();
    
    if (data && Array.isArray(data) && data.length > 0) {
      const randomIndex = Math.floor(Math.random() * data.length);
      const method = data[randomIndex];

      methodDescriptionElement.innerHTML = method.description || 'Explicação não encontrada';
      methodExampleElement.innerHTML = method.example || 'Exemplo não encontrado';
      methodNameElement.innerHTML = method.name || 'Nome não encontrado';
    } else {
      throw new Error('Dados vazios ou não encontrados');
    }
  } catch (error) {
    console.error(error);
    methodNameElement.innerHTML = 'Erro ao carregar dados';
    methodDescriptionElement.innerHTML = 'Ocorreu um erro ao buscar dados da API.';
  } finally {
    btn.style.display = '';
    pre.style.display = '';
  }
};

window.onload = generateMethod;
