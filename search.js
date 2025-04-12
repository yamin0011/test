fetch('hadiths.json')
  .then(response => response.json())
  .then(data => {
    const arabicText = data.arabic;
    document.getElementById("arabic").innerText = arabicText;

    // Store for speaking
    window.hadeesArabic = arabicText;
  });

function speakArabic() {
  const utterance = new SpeechSynthesisUtterance(window.hadeesArabic);
  utterance.lang = 'ar-SA';
  utterance.rate = 0.9;
  utterance.pitch = 1;
  speechSynthesis.speak(utterance);
}
