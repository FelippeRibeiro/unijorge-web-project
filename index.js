const synth = window.speechSynthesis;
const pauseButton = document.querySelector('#pauseSpeech');
const speechButton = document.querySelector('#speechValue');
let speechStatus = localStorage.getItem('speech') === 'true';
handleImage();

speechButton.addEventListener('click', (ev) => {
  speechStatus = !speechStatus;
  localStorage.setItem('speech', speechStatus);
  handleImage();
});

function speak(text) {
  if (speechStatus == false) return;
  synth.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = 1.3;
  const voice = synth.getVoices().find((voice) => voice.lang == 'pt-BR');
  utterance.voice = voice || null;
  synth.speak(utterance);
  pauseButton.style.display = 'block';
  utterance.addEventListener('end', (_) => {
    pauseButton.style.display = 'none';
  });
}

pauseButton.addEventListener('click', (ev) => {
  synth.cancel();
  pauseButton.style.display = 'none';
});

const cards = document.querySelectorAll('.card');
document.querySelectorAll('.card > .card-body > a').forEach((button) => {
  button.addEventListener('focus', () => {
    speak(button.innerText);
  });
});

let index = 3;
cards.forEach((card) => {
  card.addEventListener('focus', (ev) => speak(card.innerText));
  card.tabIndex = ++index;
  if (card.querySelector('.card-body > a')) card.querySelector('.card-body > a').tabIndex = ++index;
});

function handleImage() {
  const speechImage = document.querySelector('#speechImage');
  speechImage.src = speechStatus ? 'images/audio.png' : 'images/mute.png';
}
