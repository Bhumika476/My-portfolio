// Typewriter effect
const typingText = "Bhumika Regmi...";
const typingElement = document.querySelector('.typing');
let i = 0;
function typeWriter() {
  if (i <= typingText.length) {
    typingElement.textContent = typingText.slice(0, i);
    i++;
    setTimeout(typeWriter, 90);
  }
}
typeWriter();

// Dark mode toggle
const toggle = document.getElementById('themeToggle');
if (localStorage.getItem('darkMode') === 'enabled') {
  document.body.classList.add('dark');
  toggle.checked = true;
}
toggle.addEventListener('change', () => {
  if (toggle.checked) {
    document.body.classList.add('dark');
    localStorage.setItem('darkMode', 'enabled');
  } else {
    document.body.classList.remove('dark');
    localStorage.setItem('darkMode', 'disabled');
  }
});

// Auto-scroll to About after animation
window.onload = function () {
  setTimeout(() => {
    document.querySelector('#about').scrollIntoView({ behavior: 'smooth' });
  }, 3200);
};

// Scroll spy
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 60;
    if (pageYOffset >= sectionTop) {
      current = section.getAttribute('id');
    }
  });
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href').substring(1) === current) {
      link.classList.add('active');
    }
  });
});

// Skill bar animation
const skillFills = document.querySelectorAll('.fill');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const level = el.getAttribute('data-level');
      el.style.setProperty('--level', level);
      el.style.animation = 'fillSkill 2s forwards';
      observer.unobserve(el);
    }
  });
}, { threshold: 0.5 });
skillFills.forEach(fill => observer.observe(fill));

// Glowing blur
const canvas = document.getElementById('hero-canvas');
const ctx = canvas.getContext('2d');
let ball = { x: 0, y: 0, radius: 130 };
let isMouseOver = false;

function resizeCanvas() {
  canvas.width = document.querySelector('.hero').offsetWidth;
  canvas.height = document.querySelector('.hero').offsetHeight;
  if (!isMouseOver) {
    ball.x = canvas.width / 2;
    ball.y = canvas.height / 2;
  }
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

document.querySelector('.hero').addEventListener('mousemove', e => {
  const rect = canvas.getBoundingClientRect();
  ball.x = e.clientX - rect.left;
  ball.y = e.clientY - rect.top;
  isMouseOver = true;
});
document.querySelector('.hero').addEventListener('mouseleave', () => {
  ball.x = canvas.width / 2;
  ball.y = canvas.height / 2;
  isMouseOver = false;
});

function drawGlowingBlur() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  let gradient = ctx.createRadialGradient(
    ball.x, ball.y, ball.radius * 0.2,
    ball.x, ball.y, ball.radius
  );
    gradient.addColorStop(0,   'rgba(255, 225, 120, 0.38)');
    gradient.addColorStop(0.5, 'rgba(255, 200, 100, 0.18)');
    gradient.addColorStop(1,   'rgba(255, 190, 80, 0)');

    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, 2 * Math.PI);
    ctx.fillStyle = gradient;
    ctx.filter = 'blur(64px)';
    ctx.fill();
    ctx.filter = 'none';

    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius * 0.18, 0, 2 * Math.PI);
    ctx.fillStyle = 'rgba(255, 235, 170, 0.18)';
    ctx.shadowColor = '#ffd180';
    ctx.shadowBlur = 32;
    ctx.fill();
    ctx.shadowBlur = 0;
  requestAnimationFrame(drawGlowingBlur);
}
drawGlowingBlur();
const body = document.body;
const toggleDesktop = document.getElementById('themeToggle');
const toggleMobile = document.getElementById('themeToggleMobile');

// Helper function to apply dark mode
function setDarkMode(state) {
  body.classList.toggle('dark', state);
  toggleDesktop.checked = state;
  toggleMobile.checked = state;
}

// Listen for desktop toggle
if (toggleDesktop) {
  toggleDesktop.addEventListener('change', () => {
    setDarkMode(toggleDesktop.checked);
  });
}

// Listen for mobile toggle
if (toggleMobile) {
  toggleMobile.addEventListener('change', () => {
    setDarkMode(toggleMobile.checked);
  });
}
