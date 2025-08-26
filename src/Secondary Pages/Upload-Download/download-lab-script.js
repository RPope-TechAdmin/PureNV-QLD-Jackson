document.getElementById("getValues").addEventListener("click", () => {
  const selections = [];

  document.querySelectorAll(".options").forEach(group => {
    const tableName = group.getAttribute("data-table"); // 👈 find DB table
    group.querySelectorAll("input[type='checkbox']:checked:not(.group-select)")
      .forEach(cb => {
        selections.push({ table: tableName, analyte: cb.value });
      });
  });

  const startDate = document.getElementById("startDate").value;
  const endDate = document.getElementById("endDate").value;

  fetch("https://jackson-backend-jackson-e0bycnfwgrhzana9.australiaeast-01.azurewebsites.net/api/lab-data-download", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ selections, startDate, endDate })
  })
  .then(res => {
    if (!res.ok) throw new Error("Server error");
    return res.blob();
  })
  .then(blob => {
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "results.xlsx";
    a.click();
  })
  .catch(err => alert(err.message));
});
