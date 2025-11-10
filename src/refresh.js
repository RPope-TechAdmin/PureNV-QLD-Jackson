async function refreshData() {
  const res = await fetch("https://jackson-backend-jackson-e0bycnfwgrhzana9.australiaeast-01.azurewebsites.net/api/als-api-getlab", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
  });

  if (!res.ok) {
    const errorText = await res.text();
    showError(`Error: ${res.status} - ${errorText}`);
    return;
  }
}

document.getElementById("down-api").addEventListener("submit", async (e) => {
  e.preventDefault();

  await refreshData();
});
