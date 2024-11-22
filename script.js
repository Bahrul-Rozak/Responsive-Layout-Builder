const columnsInput = document.getElementById("columns");
const gridContainer = document.getElementById("grid-container");
const generatedCodeHTML = document.getElementById("generated-code-html");
const generatedCodeCSS = document.getElementById("generated-code-css");
const copyButton = document.getElementById("copy-button");

function generateGridLayout(columns) {
  gridContainer.innerHTML = "";

  const numItems = 12;

  for (let i = 0; i < numItems; i++) {
    const item = document.createElement("div");
    item.classList.add("grid-item");
    item.innerText = `Item ${i + 1}`;
    gridContainer.appendChild(item);
  }

  gridContainer.style.gridTemplateColumns = `repeat(${columns}, 1fr)`;

  generateCode(columns);
}

function generateCode(columns) {
  const htmlCode = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Responsive Layout</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="container">
        <div class="grid-container">
            <!-- Generated Grid Items -->
            ${[...Array(12)]
              .map((_, i) => `<div class="grid-item">Item ${i + 1}</div>`)
              .join("")}
        </div>
    </div>
</body>
</html>
    `;

  // CSS code
  const cssCode = `
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: Arial, sans-serif;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background-color: #f7f7f7;
}

.container {
    width: 80%;
    max-width: 1200px;
    margin: 0 auto;
    text-align: center;
}

.grid-container {
    display: grid;
    gap: 20px;
    margin-top: 20px;
    grid-template-columns: repeat(${columns}, 1fr);
}

.grid-item {
    background-color: #007bff;
    color: white;
    padding: 20px;
    text-align: center;
    border-radius: 8px;
}

.grid-item:hover {
    transform: scale(1.05);
}
    `;

  generatedCodeHTML.textContent = htmlCode;
  generatedCodeCSS.textContent = cssCode;

  Prism.highlightAll();
}

columnsInput.addEventListener("input", () => {
  const columns = parseInt(columnsInput.value) || 1;
  generateGridLayout(columns);
});

generateGridLayout(parseInt(columnsInput.value));

copyButton.addEventListener("click", () => {
  const htmlCode = generatedCodeHTML.textContent;
  const cssCode = generatedCodeCSS.textContent;

  const tempTextarea = document.createElement("textarea");
  tempTextarea.value = `HTML Code:\n\n${htmlCode}\n\nCSS Code:\n\n${cssCode}`;
  document.body.appendChild(tempTextarea);
  tempTextarea.select();
  document.execCommand("copy");
  document.body.removeChild(tempTextarea);

  alert("Code copied to clipboard!");
});
