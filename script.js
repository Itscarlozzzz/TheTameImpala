// -------- FRASES ---------
const frases = [
  "Let it happen, let it happen...",
  "Feels like we only go backwards...",
  "'Cause I'm a man, not a hero...",
  "I was gonna tell you all about it...",
  "I waited til the end of summer...",
  "I'm changing who I am...",
  "Eventually..."
];

const quoteBox = document.getElementById("quoteBox");
const newQuoteBtn = document.getElementById("newQuote");

function setRandomQuote() {
  const random = Math.floor(Math.random() * frases.length);
  quoteBox.textContent = frases[random];
}

if (quoteBox) {
  setRandomQuote();
  newQuoteBtn.addEventListener("click", setRandomQuote);
}

// -------- DISCROGRAFÍA ---------
const albumsData = [
  {
    title: "Innerspeaker",
    year: 2010,
    cover: "assets/covers/innerspeaker.jpg",
    songs: ["It Is Not Meant to Be", "Desire Be Desire Go", "Alter Ego", "Lucidity"]
  },
  {
    title: "Lonerism",
    year: 2012,
    cover: "assets/covers/lonerism.jpg",
    songs: ["Be Above It", "Endors Toi", "Apocalypse Dreams", "Elephant", "Feels Like We Only Go Backwards"]
  },
  {
    title: "Currents",
    year: 2015,
    cover: "assets/covers/currents.jpg",
    songs: ["Let It Happen", "The Moment", "Yes I'm Changing", "Eventually", "The Less I Know the Better"]
  },
  {
    title: "The Slow Rush",
    year: 2020,
    cover: "assets/covers/the-slow-rush.jpg",
    songs: ["One More Year", "Borderline", "Posthumous Forgiveness", "Breathe Deeper", "On Track"]
  }
];

const albumsContainer = document.getElementById("albums");
const filterInput = document.getElementById("filterInput");

function renderAlbums(list) {
  if (!albumsContainer) return;
  albumsContainer.innerHTML = "";
  list.forEach(alb => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <img src="${alb.cover}" alt="${alb.title}">
      <h3>${alb.title}</h3>
      <p>Año: ${alb.year}</p>
      <p>Canciones: ${alb.songs.join(", ")}</p>
    `;
    albumsContainer.appendChild(card);
  });
}

renderAlbums(albumsData);

filterInput?.addEventListener("input", (e) => {
  const q = e.target.value.toLowerCase();
  const filtered = albumsData.filter(a =>
    a.title.toLowerCase().includes(q) ||
    String(a.year).includes(q) ||
    a.songs.some(s => s.toLowerCase().includes(q))
  );
  renderAlbums(filtered);
});

// -------- QUIZ ---------
const quizQ = [
  {
    q: "¿Cuál es el primer álbum de estudio de Tame Impala?",
    options: ["Innerspeaker", "Lonerism", "Currents"],
    a: 0
  },
  {
    q: "¿En qué año salió 'Currents'?",
    options: ["2012", "2015", "2020"],
    a: 1
  },
  {
    q: "¿Cómo se llama el líder y productor principal?",
    options: ["Kevin Parker", "Kevin Parker Jr.", "Kevin Smith"],
    a: 0
  },
  {
    q: "Completa: 'Feels like we only go ______'",
    options: ["forwards", "sideways", "backwards"],
    a: 2
  },
  {
    q: "Canción de 'The Slow Rush' que habla de su padre:",
    options: ["Borderline", "Posthumous Forgiveness", "Breathe Deeper"],
    a: 1
  }
];

const startQuizBtn = document.getElementById("startQuiz");
const quizModal = document.getElementById("quizModal");
const closeQuizBtn = document.getElementById("closeQuiz");
const quizContainer = document.getElementById("quizContainer");

let currentQ = 0;
let score = 0;

function openQuiz() {
  quizModal.classList.remove("hidden");
  quizModal.setAttribute("aria-hidden","false");
  currentQ = 0;
  score = 0;
  showQuestion();
}

function closeQuiz() {
  quizModal.classList.add("hidden");
  quizModal.setAttribute("aria-hidden","true");
}

function showQuestion() {
  const data = quizQ[currentQ];
  quizContainer.innerHTML = `
    <p><strong>${currentQ+1}/${quizQ.length}</strong> ${data.q}</p>
    ${data.options.map((opt,i)=>`
      <button class="btn-secundario quiz-opt" data-i="${i}">${opt}</button>
    `).join('')}
  `;
  document.querySelectorAll('.quiz-opt').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      const chosen = Number(btn.dataset.i);
      if(chosen === data.a) score++;
      currentQ++;
      if(currentQ < quizQ.length){
        showQuestion();
      } else {
        quizContainer.innerHTML = `
          <h4>¡Listo!</h4>
          <p>Tu puntuación: <strong>${score}/${quizQ.length}</strong></p>
          <button class="btn-primario" id="retryQuiz">Reintentar</button>
        `;
        document.getElementById('retryQuiz').addEventListener('click', openQuiz);
      }
    });
  });
}

startQuizBtn?.addEventListener("click", openQuiz);
closeQuizBtn?.addEventListener("click", closeQuiz);
quizModal?.addEventListener("click", (e)=>{
  if(e.target === quizModal) closeQuiz();
});

// -------- Scroll Animations ---------
const faders = document.querySelectorAll('.fade-in');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

faders.forEach(el => observer.observe(el));

// -------- Sticky Nav Active Link ---------
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('#nav a');

window.addEventListener('scroll', () => {
  const scrollPos = window.scrollY + 120;
  sections.forEach(sec => {
    if (scrollPos >= sec.offsetTop && scrollPos < sec.offsetTop + sec.offsetHeight) {
      navLinks.forEach(l => l.classList.remove('active'));
      const link = document.querySelector(`#nav a[href="#${sec.id}"]`);
      link?.classList.add('active');
    }
  });
});

// -------- Botón subir ---------
const toTopBtn = document.getElementById('toTop');
window.addEventListener('scroll', ()=>{
  if(window.scrollY > 400){
    toTopBtn.classList.add('show');
  } else {
    toTopBtn.classList.remove('show');
  }
});

toTopBtn.addEventListener('click', ()=>{
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// -------- Form de contacto fake ---------
const contactForm = document.getElementById('contactForm');
const formMsg = document.getElementById('formMsg');

contactForm?.addEventListener('submit', ()=>{
  formMsg.textContent = '¡Mensaje enviado! (Demo, aún no hay backend)';
});
