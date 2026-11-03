// Input elementlarini olish
const inputName = document.getElementById('input-name');
const inputRole = document.getElementById('input-role');
const inputBio = document.getElementById('input-bio');
const inputSkills = document.getElementById('input-skills');
const inputProjTitle = document.getElementById('input-proj-title');
const inputProjDesc = document.getElementById('input-proj-desc');
const inputContact = document.getElementById('input-contact');

const previewArea = document.getElementById('preview-area');
const btnGenerateCode = document.getElementById('btn-generate-code');
const codeModal = document.getElementById('code-modal');
const btnCloseModal = document.getElementById('btn-close-modal');
const btnCopyCode = document.getElementById('btn-copy-code');

const outputHtml = document.getElementById('output-html');
const outputCss = document.getElementById('output-css');

// Live Preview funksiyasi
function updatePreview() {
  const name = inputName.value || 'Ismingiz';
  const role = inputRole.value || 'Kasbingiz';
  const bio = inputBio.value || 'Bio';
  const skills = inputSkills.value.split(',').map(s => s.trim()).filter(s => s);
  const projTitle = inputProjTitle.value || 'Loyiha nomi';
  const projDesc = inputProjDesc.value || 'Loyiha tavsifi';
  const contact = inputContact.value || 'Aloqa ma'lumotlari';

  // Skills teglarini tayyorlash
  const skillsHtml = skills.map(s => `<span class="pv-skill-tag">${s}</span>`).join('');

  // Live HTML tuzish
  const previewHtml = `
    <div class="pv-hero">
      <h1>${name}</h1>
      <p class="role">${role}</p>
      <p class="bio">${bio}</p>
    </div>

    <div class="pv-section">
      <h2>⚡ Ko'nikmalar</h2>
      <div class="pv-skills-list">
        ${skillsHtml}
      </div>
    </div>

    <div class="pv-section">
      <h2>🚀 Loyihalar</h2>
      <div class="pv-project-card">
        <h3>${projTitle}</h3>
        <p style="color: #64748b; margin-top: 5px;">${projDesc}</p>
      </div>
    </div>

    <div class="pv-section">
      <h2>📬 Aloqa</h2>
      <p style="color: #334155; font-weight: 500;">${contact}</p>
    </div>
  `;

  previewArea.innerHTML = previewHtml;
}

// Barcha inputlarga Hodisa (Event) ulash
[inputName, inputRole, inputBio, inputSkills, inputProjTitle, inputProjDesc, inputContact].forEach(input => {
  input.addEventListener('input', updatePreview);
});

// Dastlabki yuklanishda ishlatish
updatePreview();

// Kodni generatsiya qilish
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
body { font-family: sans-serif; background: #ffffff; color: #0f172a; padding: 40px; }
.pv-hero { text-align: center; padding-bottom: 30px; border-bottom: 1px solid #e2e8f0; }
.pv-hero h1 { font-size: 2.5rem; }
.role { color: #0284c7; font-size: 1.2rem; font-weight: bold; }
.pv-section { padding: 30px 0; border-bottom: 1px solid #e2e8f0; }
.pv-skill-tag { background: #e0f2fe; color: #0369a1; padding: 5px 12px; border-radius: 15px; display: inline-block; margin: 4px; }
.pv-project-card { background: #f8fafc; padding: 15px; border-radius: 8px; border: 1px solid #e2e8f0; }`;

  codeModal.classList.remove('hidden');
});

btnCloseModal.addEventListener('click', () => {
  codeModal.classList.add('hidden');
});

btnCopyCode.addEventListener('click', () => {
  navigator.clipboard.writeText(outputHtml.value + "\n\n/* CSS STYLES */\n\n" + outputCss.value);
  alert("HTML va CSS kodlari nusxalandi!");
});
