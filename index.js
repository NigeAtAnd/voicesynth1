let voices;

function getVoiceByName(name) {
  return voices.find(voice => voice.name === name);
}

function say() {
  const thingToSay = document.getElementById('speechinput').value;
  const selectedVoice = document.getElementById('voiceselect').selectedOptions[0];
  const rate = document.getElementById('rate').value;
  const pitch = document.getElementById('pitch').value;

  const utterance = new SpeechSynthesisUtterance(thingToSay);

  // Two ways of setting the voice!
  //utterance.lang = selectedVoice.getAttribute('data-lang');
  utterance.voice = getVoiceByName(selectedVoice.getAttribute('data-name'));
  utterance.rate = rate;
  utterance.pitch = pitch;
  utterance.onboundary = () => addEvent('onboundary'); // Dodgy
  utterance.onend = () => addEvent('onend');
  utterance.onstart = () => addEvent('onstart');
  utterance.onmark = () => addEvent('onmark');
  utterance.onerror = () => addEvent('onerror');

  window.speechSynthesis.speak(utterance);
}

function loadVoices() {
  const voicesSelect = document.getElementById('voiceselect');
  while (voicesSelect.firstChild) {
    voicesSelect.removeChild(voicesSelect.firstChild);
  }

  voices = window.speechSynthesis.getVoices();

  voices.forEach(voice => {
    const option = document.createElement('option');

    // voice.default is dodgy.
    option.textContent = `${voice.name} (${voice.lang}) ${voice.default ? ' (default)' : ''}`;

    option.setAttribute('data-lang', voice.lang);
    option.setAttribute('data-name', voice.name);
    voicesSelect.appendChild(option);
  });
}

function addEvent(text) {
  const eventsList = document.getElementById('events');
  var time = new Date().toLocaleTimeString();
  eventsList.value = `${time} ${text}\n${eventsList.value}`;
}

function voicesChanged() {
  addEvent('voicesChanged');
  loadVoices();
}

window.onload = loadVoices;
window.speechSynthesis.onvoiceschanged = voicesChanged;
