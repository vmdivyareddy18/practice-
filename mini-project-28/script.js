const redInput = document.getElementById('red');
const greenInput = document.getElementById('green');
const blueInput = document.getElementById('blue');
const redValue = document.getElementById('redValue');
const greenValue = document.getElementById('greenValue');
const blueValue = document.getElementById('blueValue');
const swatch = document.getElementById('swatch');
const colorInfo = document.getElementById('colorInfo');
const copyButton = document.getElementById('copyButton');
const resetButton = document.getElementById('resetButton');
const hexInfo = document.getElementById('hexInfo');

function componentToHex(value) {
  return value.toString(16).padStart(2, '0');
}

function rgbToHex(r, g, b) {
  return `#${componentToHex(r)}${componentToHex(g)}${componentToHex(b)}`;
}

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
  redInput.value = 150;
  greenInput.value = 200;
  blueInput.value = 220;
  updateColor();
});

[redInput, greenInput, blueInput].forEach((input) => {
  input.addEventListener('input', updateColor);
});

updateColor();
