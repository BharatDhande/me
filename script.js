// Neural Network Canvas Animation
const canvas = document.getElementById('neuralCanvas');
const ctx = canvas.getContext('2d');

let width, height;
let nodes = [];
let connections = [];

function resizeCanvas() {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
  initializeNodes();
}

function initializeNodes() {
  nodes = [];
  const nodeCount = Math.floor((width * height) / 15000);
  
  for (let i = 0; i < nodeCount; i++) {
    nodes.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      radius: Math.random() * 2 + 1
    });
  }
}

function drawNodes() {
  nodes.forEach(node => {
    // Update position
    node.x += node.vx;
    node.y += node.vy;
    
    // Boundary check
    if (node.x < 0 || node.x > width) node.vx *= -1;
    if (node.y < 0 || node.y > height) node.vy *= -1;
    
    // Draw node
    ctx.beginPath();
    ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(0, 240, 255, 0.6)';
    ctx.fill();
    
    // Draw glow
    const gradient = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, node.radius * 3);
    gradient.addColorStop(0, 'rgba(0, 240, 255, 0.2)');
    gradient.addColorStop(1, 'rgba(0, 240, 255, 0)');
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(node.x, node.y, node.radius * 3, 0, Math.PI * 2);
    ctx.fill();
  });
}

function drawConnections() {
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const dx = nodes[i].x - nodes[j].x;
      const dy = nodes[i].y - nodes[j].y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance < 150) {
        const opacity = (1 - distance / 150) * 0.5;
        ctx.beginPath();
        ctx.strokeStyle = `rgba(0, 240, 255, ${opacity})`;
        ctx.lineWidth = 0.5;
        ctx.moveTo(nodes[i].x, nodes[i].y);
        ctx.lineTo(nodes[j].x, nodes[j].y);
        ctx.stroke();
      }
    }
  }
}

function animate() {
  ctx.clearRect(0, 0, width, height);
  drawConnections();
  drawNodes();
  requestAnimationFrame(animate);
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();
animate();

// Typing Animation
const typingText = document.querySelector('.typing-text');
const phrases = [
  'AI/ML Engineer',
  'Python Developer',
  'Deep Learning Expert',
  'NLP Specialist',
  'Computer Vision Engineer'
];

let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;

function typeEffect() {
  const currentPhrase = phrases[phraseIndex];
  
  if (isDeleting) {
    typingText.textContent = currentPhrase.substring(0, charIndex - 1);
    charIndex--;
    typingSpeed = 50;
  } else {
    typingText.textContent = currentPhrase.substring(0, charIndex + 1);
    charIndex++;
    typingSpeed = 100;
  }
  
  if (!isDeleting && charIndex === currentPhrase.length) {
    isDeleting = true;
    typingSpeed = 2000;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    phraseIndex = (phraseIndex + 1) % phrases.length;
    typingSpeed = 500;
  }
  
  setTimeout(typeEffect, typingSpeed);
}

// Start typing effect
typeEffect();

// Navigation
const navBar = document.querySelector('.nav-bar');
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
const navLinkElements = document.querySelectorAll('.nav-link');

// Scroll effect
window.addEventListener('scroll', () => {
  if (window.scrollY > 100) {
    navBar.classList.add('scrolled');
  } else {
    navBar.classList.remove('scrolled');
  }
});

// Mobile menu toggle
navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});

// Active nav link on scroll
function updateActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const scrollY = window.pageYOffset;
  
  sections.forEach(section => {
    const sectionHeight = section.offsetHeight;
    const sectionTop = section.offsetTop - 100;
    const sectionId = section.getAttribute('id');
    const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
    
    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      navLinkElements.forEach(link => link.classList.remove('active'));
      if (navLink) navLink.classList.add('active');
    }
  });
}

window.addEventListener('scroll', updateActiveNav);

// Smooth scroll for navigation links
navLinkElements.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const targetId = link.getAttribute('href');
    const targetSection = document.querySelector(targetId);
    
    navLinks.classList.remove('active');
    
    targetSection.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  });
});

// Skill bars animation
const skillFills = document.querySelectorAll('.skill-fill');

function animateSkills() {
  skillFills.forEach(fill => {
    const targetWidth = fill.getAttribute('data-width');
    fill.style.width = targetWidth + '%';
  });
}

// Intersection Observer for skill bars
const skillsSection = document.querySelector('.skills-section');
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateSkills();
      skillObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

if (skillsSection) {
  skillObserver.observe(skillsSection);
}

// Projects Data
const projects = [
  {
    title: 'Smart Farm - Crop Recommendation & Disease Detection',
    description: 'End-to-end ML pipeline with Flask dashboard, multilingual UI, and chatbot integration for smart agriculture. Features crop recommendation based on soil parameters and disease detection using computer vision.',
    image: 'Assets/smart-farm_dashboard.png',
    link: 'https://github.com/BharatDhande/Smart_Farm',
    live: 'https://smartfarm-71po.onrender.com/',
    tags: ['Flask', 'OpenCV', 'Random Forest', 'Dashboard', 'ML']
  },
  {
    title: 'RAGify - Retrieval-Augmented Chatbot',
    description: 'Advanced RAG system with embeddings, Qdrant vector database, PDF ingestion, and conversational retrieval UI. Implements state-of-the-art LLM integration with context-aware responses.',
    image: 'Assets/ragify.png',
    link: 'https://github.com/BharatDhande/RAGify',
    tags: ['NLP', 'RAG', 'Embeddings', 'Qdrant', 'LLaMA', 'LangChain', 'Streamlit']
  },
  {
    title: 'Big Mart Sales Prediction',
    description: 'Predictive analytics model forecasting product sales across retail outlets using advanced ML algorithms. Includes comprehensive EDA, feature engineering, and model optimization.',
    image: 'Assets/BigMart.png',
    link: 'https://github.com/BharatDhande/Big-Mart',
    tags: ['Linear Regression', 'Random Forest', 'EDA', 'ML', 'Analytics']
  },
  {
    title: 'Jarvis AI - Personal Voice Assistant',
    description: 'Intelligent voice-controlled assistant with speech recognition, web scraping, task automation, and OpenAI integration. Features natural language understanding and multi-task execution.',
    image: 'Assets/Jarvis.jpg',
    link: 'https://github.com/BharatDhande/Jarvis-voice-assistant',
    tags: ['Speech Recognition', 'Web Scraping', 'Automation', 'OpenAI', 'NLP']
  }
];

// Render Projects
const projectsGrid = document.getElementById('projectsGrid');

projects.forEach(project => {
  const projectCard = document.createElement('div');
  projectCard.className = 'project-card reveal';
  
  projectCard.innerHTML = `
  <img src="${project.image}" alt="${project.title}" class="project-image"
    onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22400%22 height=%22240%22%3E%3Crect fill=%22%23111%22 width=%22400%22 height=%22240%22/%3E%3Ctext fill=%22%23666%22 font-family=%22monospace%22 font-size=%2220%22 x=%2250%25%22 y=%2250%25%22 text-anchor=%22middle%22 dominant-baseline=%22middle%22%3EProject Image%3C/text%3E%3C/svg%3E'">

  <div class="project-content">

    <div class="project-header">
  <h3 class="project-title">${project.title}</h3>

  <div class="project-actions">

    <a href="${project.link}" target="_blank" class="project-btn">
      Code
    </a>

    ${project.live ? `
      <a href="${project.live}" target="_blank" class="project-btn live">
        Live Demo
      </a>
    ` : ''}

  </div>
</div>


    <p class="project-description">${project.description}</p>

    <div class="project-tags">
      ${project.tags.map(tag => `<span class="project-tag">${tag}</span>`).join('')}
    </div>
  </div>
`;

  projectsGrid.appendChild(projectCard);
});

// Scroll Reveal Animation
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

revealElements.forEach(element => {
  revealObserver.observe(element);
});

// Contact Form with EmailJS
(function() {
  emailjs.init('LL6yM3qhGl1aIY2Tv'); // Replace with your EmailJS public key
})();

const contactForm = document.getElementById('contactForm');
const toast = document.getElementById('toast');

function showToast(message, type = 'success') {
  toast.textContent = message;
  toast.className = `toast ${type} show`;
  
  setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);
}

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  const submitBtn = contactForm.querySelector('.form-submit');
  const originalText = submitBtn.innerHTML;
  
  submitBtn.innerHTML = `
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" class="spinning">
      <circle cx="12" cy="12" r="10"/>
      <path d="M12 6v6l4 2"/>
    </svg>
    <span>Sending...</span>
  `;
  submitBtn.disabled = true;
  
  emailjs.sendForm(
    'service_u3elzhh',  // Replace with your Service ID
    'template_vawxxra', // Replace with your Template ID
    '#contactForm'
  )
.then(() => {

  showToast('✨ Message sent successfully!', 'success');
  emailjs.sendForm(
    'service_u3elzhh',
    'template_18o58yt',
    '#contactForm'
  );

  contactForm.reset();
})

  .catch((error) => {
    console.error('Error:', error);
    showToast('❌ Failed to send message. Please try again.', 'error');
  })
  .finally(() => {
    submitBtn.innerHTML = originalText;
    submitBtn.disabled = false;
  });
});

// Current Year in Footer
document.getElementById('currentYear').textContent = new Date().getFullYear();

// Parallax effect for hero section
let mouseX = 0;
let mouseY = 0;
let currentX = 0;
let currentY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = (e.clientX / window.innerWidth - 0.5) * 20;
  mouseY = (e.clientY / window.innerHeight - 0.5) * 20;
});

function animateParallax() {
  currentX += (mouseX - currentX) * 0.1;
  currentY += (mouseY - currentY) * 0.1;
  
  const floatingCards = document.querySelectorAll('.floating-card');
  floatingCards.forEach((card, index) => {
    const speed = (index + 1) * 0.5;
    card.style.transform = `translate(${currentX * speed}px, ${currentY * speed}px)`;
  });
  
  requestAnimationFrame(animateParallax);
}

animateParallax();

// Add spinning animation for loading state
const style = document.createElement('style');
style.textContent = `
  @keyframes spinning {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
  .spinning {
    animation: spinning 1s linear infinite;
  }
`;
document.head.appendChild(style);

// Performance optimization
window.addEventListener('load', () => {
  // Lazy load images
  const images = document.querySelectorAll('img[data-src]');
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
        imageObserver.unobserve(img);
      }
    });
  });
  
  images.forEach(img => imageObserver.observe(img));
});

// Add smooth scrolling for all anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href !== '#') {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    }
  });
});

console.log('%c🚀 Portfolio Loaded Successfully! ', 'background: linear-gradient(135deg, #00f0ff 0%, #ff00ff 100%); color: #000; padding: 10px 20px; font-size: 16px; font-weight: bold;');
console.log('%cBuilt with ❤️ by Bharat Dhande', 'color: #00f0ff; font-size: 14px;');



