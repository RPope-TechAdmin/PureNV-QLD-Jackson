const form = document.getElementById('upload-form');
const output = document.getElementById('output');

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const fileInput = document.getElementById('file-input');
  const queryType = document.getElementById('query-type').value;
  const file = fileInput.files[0];

  if (!file) {
    alert("Please select a PDF file.");
    return;
  }

  const formData = new FormData();
  formData.append("file", file);
  formData.append("query_type", queryType);

  try {
    const response = await fetch("https://jackson-backend-jackson-e0bycnfwgrhzana9.australiaeast-01.azurewebsites.net/api/lab-data", {
      method: "POST",
      body: formData,
      headers: {
        "Accept": "application/json"
      }
    });

    const text = await response.text();
    const data = JSON.parse(text);
    output.textContent = JSON.stringify(data, null, 2);
  } catch (err) {
    console.error("Upload error:", err.message);
    output.textContent = "Upload failed.";
  }
});
