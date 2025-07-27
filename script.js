const frases = [
  "Let it happen, let it happen...",
  "Feels like we only go backwards...",
  "I'm a man, woman...",
  "I'm changing who I am...",
  "I was gonna tell you all about it...",
  "‘Cause I’m a man, not a hero...",
  "I waited ‘til the end of summer..."
];

const quoteBox = document.getElementById("quoteBox");
const random = Math.floor(Math.random() * frases.length);
quoteBox.textContent = frases[random];
