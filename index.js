const synth = window.speechSynthesis;
function speak(text) {
  synth.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = 1.3;
  const voice = speechSynthesis.getVoices().find((voice) => voice.lang == 'pt-BR');
  utterance.voice = voice || null;
  speechSynthesis.speak(utterance);
}

const cards = document.querySelectorAll('.card');
document.querySelectorAll('.card > .card-body > a').forEach((button) => {
  button.addEventListener('focus', () => {
    speak(button.innerText);
  });
});

let index = 3;
cards.forEach((card) => {
  card.addEventListener('focus', (ev) => {
    const text = card.innerText;
    speak(text);
  });
  card.tabIndex = ++index;
  if (card.querySelector('.card-body > a')) card.querySelector('.card-body > a').tabIndex = ++index;
});
