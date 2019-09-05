function say() {
  const thingToSay = document.getElementById('speechinput').value;

  const utterance = new SpeechSynthesisUtterance(thingToSay);

  window.speechSynthesis.speak(utterance);  
}
