//Aqui estou pegando a API de sintese de voz e atribuindo uma variável
//Deixei de forma global pois preciso acessar em diversos escopos {}
const synth = window.speechSynthesis;

//Aqui estou pegando o botão responsavél por pausar a leitura de tela pelo DOM através do id do elemento
const pauseButton = document.querySelector('#pauseSpeech');
//Aqui estou pegando o botão responsavel por desligar/ligar a fala pelo DOM através do id do elemento
const speechButton = document.querySelector('#speechValue');

//Aqui estou pegando um valor salvo no LocalStorage que sera responsavel por definir se o o usuario deseja que o site tenha a leitura de tela ou Nao
let speechStatus = localStorage.getItem('speech') === 'true';

//Aqui estou chamando a função que tem como funcionalidade alterar a foto do botão de leitura de tela de acordo com a variavel acima
handleImage();

//Aqui estou escutador de envento Click no botão responsavel por desligar/ligar a leitura de tela e alterando a variavel que armezena o valor dessa escolha.
// e por final mudando a foto do botão
speechButton.addEventListener('click', (ev) => {
  //Expressão para inverter o valor da variável
  speechStatus = !speechStatus;

  // Salvando o valor da variavel no localStorage para o navegador lembrar a ultima escolha
  localStorage.setItem('speech', speechStatus);

  //Chamando a função para verificar o valor da variável que armazena o valor se o usuario deseja ou não a leitura de tela, e assim troca a foto de mute para um foto de som
  // Ou vise versa
  handleImage();
});

//Essa função é a função responsavel pela leitura de tela
//Ela recebe um parametro que é o texto que vai ser lido pelo navegador
function speak(text) {
  //Verifico se o usuario desligou a leitura de tela ou nao, caso seja false significa que o usuario não deseja, então eu não executo a função
  if (speechStatus == false) return;

  //Aqui eu cancelo a leitura de tela pois o navegador pode estar lendo algum texto anterior a esse
  synth.cancel();

  //Instancio a classe de sintese de voz que é necessario para fazer a leitura de tela
  const utterance = new SpeechSynthesisUtterance(text);

  //Aqui eu defino a velocidade da leitura de tela
  utterance.rate = 1.3;

  //Aqui eu estou pegando todos o idiomas disponíveis do navegador para fazer a leitura de tela e dando preferência para o português
  const voice = synth.getVoices().find((voice) => voice.lang == 'pt-BR');

  //Caso não tenha nenhum idioma disponível, eu pego o idioma padrão do navegador
  utterance.voice = voice || null;

  //Essa função é a função que de fala o texto passado como parametro
  synth.speak(utterance);

  //Estou alterando o CSS do botão de pausa de leitura de tela, esse botão eu peguei na linha 6 através do DOM
  //Aqui eu mostro o botão de pausa de leitura de tela, pois ele fica escondido por padrao
  pauseButton.style.display = 'block';

  //Aqui eu adiciono um escutador de evento para quando o evento de fala terminar, eu remover o botão de pausa da tela
  utterance.addEventListener('end', (_) => {
    pauseButton.style.display = 'none';
  });
}

//Aqui estou adicionando um escutador de evento de click para quando eu clicar no botão de pause, eu parar a leitura de tela
pauseButton.addEventListener('click', (ev) => {
  //Aqui eu cancelo a leitura de tela, atráves da varaivel global da linha 6 que armazena a funcionalidade de leitura de tela
  synth.cancel();
  //Aqui estou alterando novamente o CSS do botão de pause, agora deixando ele invisivel, pois a leitura de tela foi parada
  pauseButton.style.display = 'none';
});

//Aqui estou buscando todos os elementos HTML que tem a classe card, através do DOM
// document.querySelectorAll é o metodo que busca todos os elementos HTML que tem uma classe especifica
//Esse metodo me retorna um Array []
//Dentro desse array contem todos os elementos HTML que tem a classe card
// [card1,card2,card3]
const cards = document.querySelectorAll('.card');
//Aqui estou fazendo a mesma coisa, porem agora estou pegando todos os links que estão dentro do elemento com a classe card-body que é filho de card
const buttonsSaberMais = document.querySelectorAll('.card > .card-body > a');

//Aqui estou percorrendo todos os links encontrados na linha 79, percorrer é executar uma função/ação para cada item dentro de um array
// [link1,link2,link3] se o array tem 3 links, eu estou executando a mesma função para cada um desses links
//[].forEach() e um metodo que percorre todos os itens dentro de um array
buttonsSaberMais.forEach((button) => {
  //Aqui dentro a variavel button se refere a cada um dos links que estiver dentro de um array
  // Estou adicionando um escutador de evento de foco para cada um dos links
  //Foco é quando o usuario tiver dado Tab no elemento ou clicado nele
  //Quando o foco estiver no link que é o botão de saber mais azul do HTML, eu devo falar o texto do botão "Saber mais"
  button.addEventListener('focus', () => {
    //Aqui estou passando o texto do botão para a função de leitura de tela da linha 32
    speak(button.innerText);
  });
});

//Aqui é a variavel que vai ser responsavel por armazenar o indice do tab-index
// Eu começo ela com o valor 3 por que existem 3 botão já no html que ja tem tab-index, eles estão no navbar
let index = 3;

//Aqui estou percorrendo todos os cards, que a gente pegou na linha 77. eles estão dentro de um array
//Estou fazendo a mesma coisa que fiz com os botões saber mais
cards.forEach((card) => {
  //Aqui percorro cada um dos cards encontrados
  //Esses cards encontrados aqui dentro são identificandos pela variavel card

  //Estou adicionando um escutador de evento de foco para cada um dos cards
  //Quando o card for focado, eu chamo a função responsavel pela leitura de Tela, e passa como parametro todo conteudo do card
  // a mesma coisa que fiz na linha 89 e 91
  card.addEventListener('focus', (ev) => speak(card.innerText));

  //Aqui estou adicionando um tab-index para cada card.
  //Tab index é a sequencia que que o tab foca nos elementos
  //Quando o usuario apertar tab, o documento focara no elemente que esta com o tab index
  // Em sequencia, quando esse elemento for focado, caso o usuario tenha ativado a leitura de tela, a função da linha 108 será executando, assim falando o conteudo do card
  card.tabIndex = ++index;
  // ++ é uma forma de incrementar a variavel. pesquisem o que é incrementar

  //Aqui estou fazendo a mesma coisa acima, porem adicionando um tab-index aos botões saber mais
  if (card.querySelector('.card-body > a')) card.querySelector('.card-body > a').tabIndex = ++index;

  //Dessa forma, o primeiro card da tela ficara com o tab-index = 4 e o botão desse saber mais desse card fira com o tab-index = 5
});

//Essa é a função responsavel por alterar a imagem do botão de status da leitura de tela
function handleImage() {
  //Aqui estou buscando o elemento HTML com o id speechImage através do DOM e atribuindo a variável speechImage
  const speechImage = document.querySelector('#speechImage');
  //Isso é um operador ternário, é algo como um if else, porem em uma linha
  // if expressão ? se verdadeiro : se falso
  //Estou altenando o src do elemento de imagem de acordo com a variavel speechStatus que armazena o valor se o usuario deseja ou não a leitura de tela
  // se speechStatus for true, eu altero o src para 'images/audio.png'
  // se speechStatus for false, eu altero o src para 'images/mute.png'
  speechImage.src = speechStatus ? 'images/audio.png' : 'images/mute.png';
}
