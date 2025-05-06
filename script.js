const data = [
  { "CLASS NAME": "BARE LAND", "LOSS": 2.6613, "GAIN": 7.7715, "UNCHANGE": 0.8136, "CHANGE INDEX": 6.280973451 },
  { "CLASS NAME": "HIGH DENSITY URBAN", "LOSS": 134.1684, "GAIN": 199.5183, "UNCHANGE": 112.1121, "CHANGE INDEX": 0.582897832 },
  { "CLASS NAME": "LOW DENSITY URBAN", "LOSS": 152.7642, "GAIN": 106.9371, "UNCHANGE": 63.6867, "CHANGE INDEX": -0.719570962 },
  { "CLASS NAME": "SRUB", "LOSS": 67.0104, "GAIN": 40.7907, "UNCHANGE": 14.1768, "CHANGE INDEX": -1.849479431 },
  { "CLASS NAME": "VEGETATION", "LOSS": 55.2132, "GAIN": 53.4339, "UNCHANGE": 26.7597, "CHANGE INDEX": -0.066491777 },
  { "CLASS NAME": "WATERBODY", "LOSS": 16.7886, "GAIN": 20.1546, "UNCHANGE": 12.2769, "CHANGE INDEX": 0.274173448 }
];

// Populate Table
const tableHead = document.getElementById("table-head");
const tableBody = document.getElementById("data-table");

tableHead.innerHTML = `<tr>
  <th>Class Name</th>
  <th>Loss</th>
  <th>Gain</th>
  <th>Change Index</th>
  <th>Unchanged</th>
</tr>`;

tableBody.innerHTML = data.map(row => `
  <tr>
    <td>${row["CLASS NAME"]}</td>
    <td>${row.LOSS.toFixed(2)}</td>
    <td>${row.GAIN.toFixed(2)}</td>
    <td>${row["CHANGE INDEX"].toFixed(2)}</td>
    <td>${row.UNCHANGE.toFixed(2)}</td>
  </tr>
`).join("");

// Bar Chart
Plotly.newPlot('barChart', [
  {
    x: data.map(d => d["CLASS NAME"]),
    y: data.map(d => d.GAIN),
    name: 'Gain',
    type: 'bar',
    marker: { color: 'green' }
  },
  {
    x: data.map(d => d["CLASS NAME"]),
    y: data.map(d => d.LOSS),
    name: 'Loss',
    type: 'bar',
    marker: { color: 'red' }
  }
],);

// Pie Chart
function updatePieChart(valueType) {
  const values = data.map(d => valueType === "Changed"
    ? Math.abs(d.GAIN - d.LOSS)
    : d.UNCHANGE);
  const labels = data.map(d => d["CLASS NAME"]);

  Plotly.newPlot('pieChart', [{
    values: values,
    labels: labels,
    type: 'pie',
    hole: 0.4
  }]);
}

document.getElementById("valueTypeSelect").addEventListener("change", (e) => {
  updatePieChart(e.target.value);
});

// Initial render
updatePieChart("Changed");

// Dark mode toggle
document.getElementById("toggleDarkMode").addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
});











  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  