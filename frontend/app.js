const API_BASE = "http://localhost:4000/api"; 

const employeeTableBody = document.querySelector("#employeeTable tbody");
const resultsTableBody = document.querySelector("#resultsTable tbody");
const simulateBtn = document.getElementById("simulateBtn");

// Load employees on page load
async function loadEmployees() {
  const res = await fetch(`${API_BASE}/employees`);
  const employees = await res.json();
  renderEmployees(employees);
}

function renderEmployees(employees) {
  employeeTableBody.innerHTML = "";
  employees.forEach(emp => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${emp.id}</td>
      <td>${emp.access_level}</td>
      <td>${emp.request_time}</td>
      <td>${emp.room}</td>
    `;
    employeeTableBody.appendChild(tr);
  });
}

// Simulate access (GET /simulate)
simulateBtn.addEventListener("click", async () => {
  const res = await fetch(`${API_BASE}/simulate`);
  const data = await res.json();
  renderResults(data.results);
});

function renderResults(results) {
  resultsTableBody.innerHTML = "";
  results.forEach(r => {
    const tr = document.createElement("tr");
    const statusClass = r.status === "Granted" ? "status-granted" : "status-denied";
    tr.innerHTML = `
      <td>${r.id}</td>
      <td>${r.room}</td>
      <td>${r.request_time}</td>
      <td class="${statusClass}">${r.status}</td>
      <td>${r.reason}</td>
    `;
    resultsTableBody.appendChild(tr);
  });
}

// Initialize
loadEmployees();
