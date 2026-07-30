const redInput = document.getElementById('red');
const greenInput = document.getElementById('green');
const blueInput = document.getElementById('blue');
const redValue = document.getElementById('redValue');
const greenValue = document.getElementById('greenValue');
const blueValue = document.getElementById('blueValue');
const swatch = document.getElementById('swatch');
const colorInfo = document.getElementById('colorInfo');
const copyButton = document.getElementById('copyButton');

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
}

function copyColor() {
    const text = colorInfo.textContent;
    navigator.clipboard.writeText(text)
        .then(() => {
            copyButton.textContent = 'Copied!';
            setTimeout(() => {
                copyButton.textContent = 'Copy CSS Color';
            }, 1200);
        })
        .catch(() => {
            copyButton.textContent = 'Copy Failed';
            setTimeout(() => {
                copyButton.textContent = 'Copy CSS Color';
            }, 1200);
        });
}

[redInput, greenInput, blueInput].forEach((input) => {
    input.addEventListener('input', updateColor);
});

copyButton.addEventListener('click', copyColor);
updateColor();
