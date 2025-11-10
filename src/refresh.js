// ALS API frontend launcher
// Triggers your Azure Function and downloads the returned .docx

async function refreshData() {
  const button = document.getElementById("download-btn");
  const status = document.getElementById("status-msg");

  try {
    status.textContent = "Fetching data from ALS API...";
    button.disabled = true;

    const res = await fetch(
      "https://jackson-backend-jackson-e0bycnfwgrhzana9.australiaeast-01.azurewebsites.net/api/als-api-getlab",
      {
        method: "POST",
        headers: {
          "Accept": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        },
      }
    );

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`Error ${res.status}: ${errorText}`);
    }

    // Get the Word file as a blob
    const blob = await res.blob();

    // Create a download link dynamically
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    a.href = url;
    a.download = `als_data_${timestamp}.docx`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    window.URL.revokeObjectURL(url);

    status.textContent = "✅ Download complete!";
  } catch (err) {
    console.error("Fetch error:", err);
    showError(`Error: ${err.message}`);
    status.textContent = "❌ Failed to fetch data.";
  } finally {
    button.disabled = false;
  }
}

function showError(msg) {
  const errorBox = document.getElementById("error-msg");
  if (errorBox) {
    errorBox.textContent = msg;
    errorBox.style.display = "block";
  } else {
    alert(msg);
  }
}

// Attach event handler to form or button
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("down-api");
  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      await refreshData();
    });
  }

  const button = document.getElementById("download-btn");
  if (button) {
    button.addEventListener("click", async () => {
      await refreshData();
    });
  }
});
