const defaultColor = { r: 160, g: 180, b: 200 };

function toHex(value) {
  return value.toString(16).padStart(2, "0");
}

function rgbToHex(r, g, b) {
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

const redInput = document.getElementById('red');
const greenInput = document.getElementById('green');
const blueInput = document.getElementById('blue');
const redValue = document.getElementById('redValue');
const greenValue = document.getElementById('greenValue');
const blueValue = document.getElementById('blueValue');
const swatch = document.getElementById('swatch');
const colorInfo = document.getElementById('colorInfo');
const hexInfo = document.getElementById('hexInfo');
const copyButton = document.getElementById('copyButton');
const randomButton = document.getElementById('randomButton');
const resetButton = document.getElementById('resetButton');
const statusMessage = document.getElementById('statusMessage');
const presetButtons = document.querySelectorAll('.preset-button');

function updateColor() {
  const r = Number(redInput.value);
  const g = Number(greenInput.value);
  const b = Number(blueInput.value);
  const rgb = `rgb(${r}, ${g}, ${b})`;
  redValue.textContent = r;
  greenValue.textContent = g;
  blueValue.textContent = b;
  swatch.style.backgroundColor = rgb;
  colorInfo.textContent = rgb;
  hexInfo.textContent = rgbToHex(r, g, b);
  saveColor(r, g, b);
}

copyButton.addEventListener('click', () => {
  navigator.clipboard.writeText(hexInfo.textContent)
    .then(() => {
      copyButton.textContent = 'Copied!';
      statusMessage.textContent = 'Copied to clipboard';
      setTimeout(() => { copyButton.textContent = 'Copy Color'; statusMessage.textContent = ''; }, 1200);
    })
    .catch(() => {
      copyButton.textContent = 'Copy Failed';
      setTimeout(() => { copyButton.textContent = 'Copy Color'; }, 1200);
    });
});

function resetColor() {
  redInput.value = defaultColor.r;
  greenInput.value = defaultColor.g;
  blueInput.value = defaultColor.b;
  updateColor();
loadSavedColor();
}

resetButton.addEventListener('click', resetColor);

function saveColor(r, g, b) {
  localStorage.setItem('miniProject11Color', `${r},${g},${b}`);
}

function loadSavedColor() {
  const saved = localStorage.getItem('miniProject11Color');
  if (saved) {
    const [r, g, b] = saved.split(',').map(Number);
    redInput.value = r;
    greenInput.value = g;
    blueInput.value = b;
    updateColor();
  } else {
    resetColor();
  }
}


[redInput, greenInput, blueInput].forEach((input) => {
  input.addEventListener('input', updateColor);
});

updateColor();


presetButtons.forEach((button) => {
  button.addEventListener('click', () => {
    redInput.value = Number(button.dataset.r);
    greenInput.value = Number(button.dataset.g);
    blueInput.value = Number(button.dataset.b);
    updateColor();
  });
});
