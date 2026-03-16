'use strict';

// --- YOUR EXISTING LOGIC (Modified to return values instead of prompt/alert) ---

const calcTotal = (a, b, c) => a + b + c;
const calcAverage = (a, b, c) => (a + b + c) / 3;

function getGrade(avg) {
  if (avg >= 90) return 'A';
  if (avg >= 80) return 'B';
  if (avg >= 70) return 'C';
  if (avg >= 60) return 'D';
  return 'F';
}

function getStatus(avg) {
  return avg >= 60 ? 'Pass' : 'Fail';
}

function isValidScore(score) {
  return score !== '' && score >= 0 && score <= 100;
}

// --- UI LOGIC (Connecting the elements) ---

const checkBtn = document.getElementById('checkBtn');
const resetBtn = document.getElementById('resetBtn');

checkBtn.addEventListener('click', function () {
  // 1. Get Values from UI
  const name = document.getElementById('studentName').value;
  const math = document.getElementById('math').value;
  const eng = document.getElementById('english').value;
  const sci = document.getElementById('science').value;
  const reportType = document.getElementById('reportType').value;

  const errorBox = document.getElementById('error-message');

  // 2. Validation
  if (
    name === '' ||
    !isValidScore(math) ||
    !isValidScore(eng) ||
    !isValidScore(sci)
  ) {
    errorBox.classList.remove('hidden');
    return;
  }

  // Hide error if everything is fine
  errorBox.classList.add('hidden');

  // 3. Process Logic
  const nMath = Number(math);
  const nEng = Number(eng);
  const nSci = Number(sci);

  const total = calcTotal(nMath, nEng, nSci);
  const average = calcAverage(nMath, nEng, nSci);
  const grade = getGrade(average);
  const status = getStatus(average);

  const remark =
    average >= 90
      ? 'Excellent work!'
      : average >= 60
        ? 'Good job!'
        : 'Needs improvement.';

  // 4. Update UI Results
  document.getElementById('resStudentName').innerText = name;
  document.getElementById('resAverage').innerText = average.toFixed(1);
  document.getElementById('resGrade').innerText = grade;
  document.getElementById('resStatus').innerText = status;
  document.getElementById('resRemark').innerText = remark;

  // Detailed stats
  document.getElementById('resMath').innerText = nMath;
  document.getElementById('resEnglish').innerText = nEng;
  document.getElementById('resScience').innerText = nSci;
  document.getElementById('resTotal').innerText = total;

  // 5. Handle Report Type Visibility
  const detailedSection = document.getElementById('detailedInfo');
  if (reportType === 'detailed') {
    detailedSection.classList.remove('hidden');
  } else {
    detailedSection.classList.add('hidden');
  }

  // 6. Color Coding Badges
  const statusBadge = document.getElementById('resStatus');
  statusBadge.style.backgroundColor = status === 'Pass' ? '#10b981' : '#f43f5e';

  // Show Result Card, Hide Placeholder
  document.getElementById('resultPlaceholder').classList.add('hidden');
  document.getElementById('resultCard').classList.remove('hidden');
});

// Reset Functionality
resetBtn.addEventListener('click', function () {
  document.querySelector('.form-section input').value = ''; // simplistic reset
  location.reload(); // Quickest way to clear everything for a beginner project
});
