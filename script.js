document.addEventListener("DOMContentLoaded", () => {
  // Resume link
  const resume = document.body.dataset.resume;
  document.getElementById("downloadResume").href = resume;

  // Typing Animation for Skills
  const skills = ["AI", "Machine Learning", "Generative AI", "Web Development"];
  const skillEl = document.getElementById("skillAnimation");
  let skillIndex = 0, charIndex = 0, deleting = false;

  function typeEffect() {
    const currentSkill = skills[skillIndex];
    if (!deleting && charIndex <= currentSkill.length) {
      skillEl.textContent = currentSkill.substring(0, charIndex++);
    } else if (deleting && charIndex >= 0) {
      skillEl.textContent = currentSkill.substring(0, charIndex--);
    }

    if (charIndex === currentSkill.length + 1) {
      deleting = true;
      setTimeout(typeEffect, 1000);
      return;
    } else if (charIndex < 0) {
      deleting = false;
      skillIndex = (skillIndex + 1) % skills.length;
    }

    setTimeout(typeEffect, deleting ? 80 : 120);
  }
  typeEffect();

  // Skills Bar Animation
  const skillData = { "Python": 95, "ML": 88, "DL": 82, "NLP": 78, "openCV": 80, "Web Dev": 75 };
  const skillChart = document.getElementById("skillChart");
  Object.entries(skillData).forEach(([name, val]) => {
    const el = document.createElement("div");
    el.className = "skill";
    el.innerHTML = `<div class="label">${name} <span style="float:right">${val}%</span></div>
                    <div class="progress"><i style="width:0%"></i></div>`;
    skillChart.appendChild(el);
    setTimeout(() => { el.querySelector("i").style.width = val + "%"; }, 300);
  });

  // ====== PROJECTS DATA ======
  const projects = [
    {
      title: "Smart Farm — Crop Recommendation & Disease Detection",
      desc: "End-to-end pipeline with Flask dashboard, Multilingual UI, and chatbot integration.",
      link: "https://github.com/BharatDhande/Smart_Farm",
      tags: ["Flask", "OpenCV", "Random Forest", "Dashboard"],
      img:"Assets\\smart-farm_dashboard.png"
    },
    {
      title: "RAGify — Retrieval-Augmented Chatbot",
      desc: "Embeddings, Qdrant vector DB, PDF ingestion and conversational retrieval UI.",
      link: "https://github.com/BharatDhande/RAGify",
      tags: ["NLP", "RAG", "Embeddings","Quadrant","LLaMA","LangChain","Streamlit"],
      img: "Assets\\ragify.png"
    },
    {
      title: "Big Mart Sales Prediction",
      desc: "Developed a predictive model to forecast product sales across retail outlets using machine learning algorithms (Linear Regression, Random Forest).",
      link: "https://github.com/BharatDhande/Big-Mart",
      tags: ["Linear regression","Random forest", "EDA", "ML"],
      img: "Assets\\BigMart.png"
    },
    {
      title: "Jarvis AI — Personal Voice Assistant",
      desc: "Voice-controlled assistant with speech recognition, web scraping, and task automation.",
      link: "https://github.com/BharatDhande/Jarvis-voice-assistant",
      tags: ["Speech Recognition", "Web Scraping", "Automation","OpenAI"],
      img: "Assets\\Jarvis.jpg"
    },
    // {
    //   title: "Sales Dashboard & Forecasting (BI)",
    //   desc: "Interactive Plotly dashboard with KPIs and forecasting components.",
    //   link: "https://github.com/BharatDhande/Sales_Dashboard",
    //   tags: ["Plotly", "Dashboards", "Forecasting"],
    //   img: ""
    // },
    // {
    //   title: "Computer Vision Tools — Image Classifier Suite",
    //   desc: "OpenCV pipelines, augmentations and FastAPI inference endpoint.",
    //   link: "https://github.com/BharatDhande/CV-Tools",
    //   tags: ["OpenCV", "FastAPI", "Deployment"],
    //   img: ""
    // }
  ];

  // Render Projects
  const projectGrid = document.getElementById("projectGrid");
  projects.forEach(p => {
    const card = document.createElement("div");
    card.className = "project-card glass";
    card.innerHTML = `
      <img class="thumb" src="${p.img}" alt="${p.title}">
      <div class="project-body">
        <h4>${p.title}</h4>
        <p>${p.desc}</p>
        <div class="tags">${p.tags.map(t => `<span class="tag">${t}</span>`).join("")}</div>
        <p style="margin-top:10px;">
          <a href="${p.link}" class="btn outline" target="_blank">View Source</a>
        </p>
      </div>
    `;
    projectGrid.appendChild(card);
  });

// Initialize EmailJS with your Public Key
(function() {
  emailjs.init("vCTLaLTXAARHx_i8h"); // ← Replace with your EmailJS Public Key
})();

// Form elements
const form = document.getElementById("contactForm");
const sendBtn = document.getElementById("sendBtn");
const toast = document.getElementById("toast");

// Toast function
function showToast(message, type = "success") {
  toast.textContent = message;
  toast.className = type;
  toast.style.display = "block";
  setTimeout(() => {
    toast.style.display = "none";
  }, 3000);
}

// Form submission handler
form.addEventListener("submit", (e) => {
  e.preventDefault();

  // Show loading spinner on button
  sendBtn.classList.add("loading");

  emailjs.sendForm(
    "service_333ilxg",   // ← Replace with your Service ID
    "template_8vl128l",  // ← Replace with your Template ID
    "#contactForm"
  )
  .then(() => {
    showToast("✅ Message sent successfully!", "success");
    form.reset();
  })
  .catch((err) => {
    console.error("❌ Error sending message:", err);
    showToast("❌ Failed to send message. Try again!", "error");
  })
  .finally(() => {
    sendBtn.classList.remove("loading");
  });
});



  // Year in Footer
  document.getElementById("year").textContent = new Date().getFullYear();
});
