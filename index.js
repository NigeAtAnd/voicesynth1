function say() {
  const thingToSay = document.getElementById('speechinput').value;

  const utterance = new SpeechSynthesisUtterance(thingToSay);

  window.speechSynthesis.speak(utterance);  
}

function loadVoices() {
  const voicesSelect = document.getElementById('voiceselect');

  const voices = window.speechSynthesis.getVoices();

  voices.forEach(voice => {
    const option = document.createElement('option');
    option.textContent = `${voice.name} (${voice.lang}) ${voice.default ? ' (default)' : ''}`;

    option.setAttribute('data-lang', voice.lang);
    option.setAttribute('data-name', voice.name);
    voicesSelect.appendChild(option);
  });
}

loadVoices();
speechSynthesis.onvoiceschanged = loadVoices;