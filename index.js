let voices;

function getVoiceByName(name) {
  return voices.find(voice => voice.name === name);
}

function say() {
  const thingToSay = document.getElementById('speechinput').value;
  const selectedVoice = document.getElementById('voiceselect').selectedOptions[0];

  const utterance = new SpeechSynthesisUtterance(thingToSay);

  // Two ways of setting the voice!
  //utterance.lang = selectedVoice.getAttribute('data-lang');
  utterance.voice = getVoiceByName(selectedVoice.getAttribute('data-name'));

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

window.onload = loadVoices;
speechSynthesis.onvoiceschanged = loadVoices;