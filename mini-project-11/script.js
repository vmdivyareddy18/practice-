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
}

copyButton.addEventListener('click', () => {
  navigator.clipboard.writeText(colorInfo.textContent)
    .then(() => {
      copyButton.textContent = 'Copied!';
      setTimeout(() => { copyButton.textContent = 'Copy Color'; }, 1200);
    })
    .catch(() => {
      copyButton.textContent = 'Copy Failed';
      setTimeout(() => { copyButton.textContent = 'Copy Color'; }, 1200);
    });
});

resetButton.addEventListener('click', () => {
  redInput.value = 160;
  greenInput.value = 180;
  blueInput.value = 200;
  updateColor();
});

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
