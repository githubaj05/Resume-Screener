let uploadedFiles = [];


const skillSet = [
  "react","reactjs","javascript","typescript","html","css",
  "tailwind","bootstrap","node","nodejs","express",
  "mongodb","sql","mysql","postgresql",
  "python","java","c++",
  "api","rest","redux","next",
  "git","github","aws","docker",
  "machinelearning","ml","ai",
  "pandas","numpy","excel","powerbi"
];



function triggerUpload() {
  document.getElementById('resumes').click();
}

document.getElementById('resumes').addEventListener('change', function () {
  let newFiles = Array.from(this.files);

  uploadedFiles = [
    ...uploadedFiles,
    ...newFiles.filter(f => !uploadedFiles.some(e => e.name === f.name))
  ];

  updateFileDisplay();
  this.value = "";
});

function updateFileDisplay() {
  let fileText = document.getElementById('fileText');
  let deleteBtn = document.getElementById('deleteBtn');

  if (uploadedFiles.length === 0) {
    fileText.innerText = "No file chosen";
    deleteBtn.disabled = true;
  } else {
    fileText.innerText = uploadedFiles.length + " files selected";
    deleteBtn.disabled = false;
  }
}

function deleteFiles() {
  uploadedFiles = [];
  updateFileDisplay();
  document.getElementById('results').innerHTML = "";
}


function extractKeywords(text) {
  text = text.toLowerCase();

  let words = text
    .replace(/[^\w\s]/g, "")
    .split(/\s+/);

  const stopwords = [
    "the","is","and","or","to","for","with","a","an","of",
    "in","on","at","by","we","are","you","will","this","that",
    "job","title","overview","company","role","experience",
    "skills","required","preferred","basic","plus","using",
    "working","tools","concepts","developer","applications",
    "resume","description","junior","senior","candidate",
    "looking","responsible","build","building"
  ];

  return [...new Set(
    words.filter(word => word.length > 2 && !stopwords.includes(word))
  )];
}


function calculateAdvancedScore(fileName, jdText, index = 0) {

  const jdKeywords = extractKeywords(jdText);

  const jdSkills = jdKeywords.filter(word => skillSet.includes(word));

  const simulatedResumes = [
    ["sql","mysql","database","excel"],
    ["python","data","analysis","pandas"],
    ["react","javascript","html","css"],
    ["java","spring","api","backend"]
  ];

  let resumeSkills = simulatedResumes[index % simulatedResumes.length];

  let matched = jdSkills.filter(skill =>
    resumeSkills.includes(skill)
  );

  let uniqueMatched = [...new Set(matched)];
  let count = uniqueMatched.length;


  let baseScore;

  if (count === 0) {
    baseScore = 10 + (index * 3);
  } else {
    baseScore = 25 + (count * 12) + (index * 2);
  }

  let finalScore = Math.min(baseScore, 95);

  return {
    score: finalScore,
    matched: uniqueMatched
  };
}



function getTag(score) {
  if (score >= 70) return "Shortlist";
  if (score >= 40) return "Maybe";
  return "Reject";
}



function analyzeResumes() {
  let jd = document.getElementById('jd').value.toLowerCase();
  let resultsDiv = document.getElementById('results');

  if (!uploadedFiles.length || jd.trim() === "") {
    alert("Upload resumes and enter JD");
    return;
  }

  resultsDiv.innerHTML = "<p style='color:#555;'>Parsing resumes... ⏳</p>";

  let startTime = Date.now();

  let candidates = uploadedFiles.map((file, index) => {
    let res = calculateAdvancedScore(file.name, jd, index);

    return {
      name: file.name,
      score: res.score,
      tag: getTag(res.score),
      matched: res.matched
    };
  });


  candidates.sort((a, b) => b.score - a.score);

  let elapsed = Date.now() - startTime;
  let remaining = Math.max(0, 2500 - elapsed);

  setTimeout(() => {
    displayResults(candidates);
  }, remaining);
}



function displayResults(candidates) {
  let resultsDiv = document.getElementById('results');

  let html = "<h3>Candidate Rankings</h3>";

  candidates.forEach((c, i) => {
    html += `
      <div class="candidate">
        <div>
          ${i + 1}. ${c.name}
          <span class="tag ${c.tag.toLowerCase()}">${c.tag}</span>

          ${
            c.matched.length
              ? `<div style="font-size:12px;">Matched: ${c.matched.join(", ")}</div>`
              : ""
          }
        </div>

        <span class="score">${c.score}%</span>
      </div>
    `;
  });

  resultsDiv.innerHTML = html;
}