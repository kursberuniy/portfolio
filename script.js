// Boshlang'ich ma'lumotlar strukturalari
let projects = [
  { title: "E-Commerce App", desc: "Onlayn do'kon uchun React va Node.js dagi to'liq loyiha." },
  { title: "Task Manager", desc: "Vazifalarni rejalashtirish uchun qulay JS veb-ilovasi." }
];

let experiences = [
  { company: "IT Park / Freelance", role: "Frontend Developer", year: "2023 - Hozirgi vaqt" }
];

// DOM Elementlari
const inputName = document.getElementById('input-name');
const inputRole = document.getElementById('input-role');
const inputBio = document.getElementById('input-bio');
const inputSkills = document.getElementById('input-skills');
const inputEmail = document.getElementById('input-email');
const inputSocial = document.getElementById('input-social');

const projectsContainer = document.getElementById('projects-inputs-container');
const expContainer = document.getElementById('exp-inputs-container');
const btnAddProject = document.getElementById('btn-add-project');
const btnAddExp = document.getElementById('btn-add-exp');

const previewArea = document.getElementById('preview-area');
const btnGenerateCode = document.getElementById('btn-generate-code');
const codeModal = document.getElementById('code-modal');
const btnCloseModal = document.getElementById('btn-close-modal');
const btnCopyCode = document.getElementById('btn-copy-code');
const outputHtml = document.getElementById('output-html');
const outputCss = document.getElementById('output-css');

// LOYIHALAR INPUTLARINI CHIZISH
function renderProjectInputs() {
  projectsContainer.innerHTML = '';
  projects.forEach((proj, index) => {
    const item = document.createElement('div');
    item.className = 'dynamic-item';
    item.innerHTML = `
      <label>Loyiha #${index + 1} Nomi:</label>
      <input type="text" value="${proj.title}" oninput="updateProject(${index}, 'title', this.value)">
      <label>Tavsifi:</label>
      <input type="text" value="${proj.desc}" oninput="updateProject(${index}, 'desc', this.value)">
      <button class="btn-remove" onclick="removeProject(${index})">❌ O'chirish</button>
    `;
    projectsContainer.appendChild(item);
  });
}

// TAJRIBALAR INPUTLARINI CHIZISH
function renderExpInputs() {
  expContainer.innerHTML = '';
  experiences.forEach((exp, index) => {
    const item = document.createElement('div');
    item.className = 'dynamic-item';
    item.innerHTML = `
      <label>Kompaniya / Joy:</label>
      <input type="text" value="${exp.company}" oninput="updateExp(${index}, 'company', this.value)">
      <label>Lavozim:</label>
      <input type="text" value="${exp.role}" oninput="updateExp(${index}, 'role', this.value)">
      <label>Yillar:</label>
      <input type="text" value="${exp.year}" oninput="updateExp(${index}, 'year', this.value)">
      <button class="btn-remove" onclick="removeExp(${index})">❌ O'chirish</button>
    `;
    expContainer.appendChild(item);
  });
}

// LOYIHA VA TAJRIBA OZGARISHLARINI YANGILASH
window.updateProject = (index, key, val) => { projects[index][key] = val; updatePreview(); };
window.removeProject = (index) => { projects.splice(index, 1); renderProjectInputs(); updatePreview(); };

window.updateExp = (index, key, val) => { experiences[index][key] = val; updatePreview(); };
window.removeExp = (index) => { experiences.splice(index, 1); renderExpInputs(); updatePreview(); };

btnAddProject.addEventListener('click', () => {
  projects.push({ title: "Yangi Loyiha", desc: "Loyiha haqida qisqacha ma'lumot." });
  renderProjectInputs();
  updatePreview();
});

btnAddExp.addEventListener('click', () => {
  experiences.push({ company: "Kompaniya nomi", role: "Dasturchi", year: "2024" });
  renderExpInputs();
  updatePreview();
});

// LIVE PREVIEW UPDATE FUNKSIYASI
function updatePreview() {
  const name = inputName.value || 'Ismingiz';
  const role = inputRole.value || 'Kasbingiz';
  const bio = inputBio.value || 'Bio';
  const skills = inputSkills.value.split(',').map(s => s.trim()).filter(s => s);
  const email = inputEmail.value || 'Email';
  const social = inputSocial.value || "Social links";

  const skillsHtml = skills.map(s => `<div class="pv-skill-card">${s}</div>`).join('');
  
  const projectsHtml = projects.map(p => `
    <div class="pv-card">
      <h3>🚀 ${p.title}</h3>
      <p>${p.desc}</p>
    </div>
  `).join('');

  const expHtml = experiences.map(e => `
    <div class="pv-card">
      <h3>💼 ${e.company}</h3>
      <div class="sub-title">${e.role} (${e.year})</div>
    </div>
  `).join('');

  const previewHtml = `
    <div class="pv-hero">
      <h1>${name}</h1>
      <p class="role">${role}</p>
      <p class="bio">${bio}</p>
    </div>

    <div class="pv-section">
      <h2>⚡ Ko'nikmalar</h2>
      <div class="pv-skills-grid">${skillsHtml}</div>
    </div>

    <div class="pv-section">
      <h2>📂 Loyihalarim</h2>
      <div class="pv-cards-grid">${projectsHtml}</div>
    </div>

    <div class="pv-section">
      <h2>💼 Ish Tajribasi</h2>
      <div class="pv-cards-grid">${expHtml}</div>
    </div>

    <div class="pv-section">
      <h2>📬 Aloqa</h2>
      <p><b>Email:</b> ${email}</p>
      <p style="margin-top: 5px;"><b>Tarmoqlar:</b> ${social}</p>
    </div>
  `;

  previewArea.innerHTML = previewHtml;
}

// HODISALARNI ULASH
[inputName, inputRole, inputBio, inputSkills, inputEmail, inputSocial].forEach(input => {
  input.addEventListener('input', updatePreview);
});

// DASTLABKI YUKLASH
renderProjectInputs();
renderExpInputs();
updatePreview();

// KOD GENERATSIYASI
btnGenerateCode.addEventListener('click', () => {
  outputHtml.value = `<!DOCTYPE html>
<html lang="uz">
<head>
  <meta charset="UTF-8">
  <title>${inputName.value} - Portfolio</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
${previewArea.innerHTML}
</body>
</html>`;

  outputCss.value = `/* Export qilingan toza CSS styllari */
body { font-family: sans-serif; background: #f8fafc; color: #0f172a; padding: 40px; }
.pv-hero { text-align: center; padding: 40px; background: linear-gradient(135deg, #0284c7, #0369a1); color: white; border-radius: 12px; margin-bottom: 30px; }
.pv-hero h1 { font-size: 2.5rem; }
.role { font-size: 1.2rem; opacity: 0.9; }
.pv-section { background: white; padding: 25px; border-radius: 12px; margin-bottom: 25px; border: 1px solid #e2e8f0; }
.pv-skills-grid, .pv-cards-grid { display: flex; gap: 12px; flex-wrap: wrap; }
.pv-skill-card { background: #f0f9ff; color: #0369a1; padding: 8px 16px; border-radius: 8px; font-weight: bold; }
.pv-card { background: #f8fafc; padding: 15px; border-radius: 8px; border-left: 4px solid #0284c7; flex: 1; min-width: 200px; }`;

  codeModal.classList.remove('hidden');
});

btnCloseModal.addEventListener('click', () => codeModal.classList.add('hidden'));

btnCopyCode.addEventListener('click', () => {
  navigator.clipboard.writeText(outputHtml.value + "\n\n/* CSS STYLES */\n\n" + outputCss.value);
  alert("HTML va CSS kodlari nusxalandi!");
});
