const searchForm = document.getElementById("searchForm");
const billResults = document.getElementById("billResults");

function formatDateToDDMMYY(dateString) {
  const date = new Date(dateString);
  const dd = String(date.getDate()).padStart(2, '0');
  const mm = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
  const yy = String(date.getFullYear()).slice(-2); // Get last 2 digits of year

  return `${dd}${mm}${yy}`;
}

searchForm.addEventListener("submit", async function (e) {
  e.preventDefault();

  const value = document.getElementById("searchInput").value.trim();
  const field = searchForm.field.value;

  if (!value) {
    alert("Please enter a search value");
    return;
  }

  try {
    const response = await fetch(searchForm.action, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ field, value })
    });

    const result = await response.json();

    if (response.ok) {
      const bills = result.data;
      if (!bills.length) {
        billResults.innerHTML = `<p>No bills found.</p>`;
        return;
      }

      const tableHeaders = `
        <tr>
          <th>Serial No</th>
          <th>Vehicle No</th>
          <th>Party</th>
          <th>Material</th>
          <th>Gross Weight</th>
          <th>Tare Weight</th>
          <th>Net Weight</th>
          <th>Bags</th>
          <th>Charges</th>
          <th>In Time</th>
          <th>Out Time</th>
        </tr>`;

      const tableRows = bills
        .map(
          (bill) => `
        <tr>
          <td>${bill.serialNo}</td>
          <td>${bill.vehicleNo}</td>
          <td>${bill.party}</td>
          <td>${bill.material}</td>
          <td>${bill.grossWeight}</td>
          <td>${bill.tareWeight}</td>
          <td>${bill.netWeight}</td>
          <td>${bill.bags}</td>
          <td>${bill.charges}</td>
          <td>${formatDateToDDMMYY(new Date(bill.inTime).toLocaleString())}</td>
          <td>${formatDateToDDMMYY(new Date(bill.outTime).toLocaleString())}</td>
        </tr>`
        )
        .join("");

      billResults.innerHTML = `
        <div class="excel-table-wrapper">
          <table class="excel-table">
            <thead>${tableHeaders}</thead>
            <tbody>${tableRows}</tbody>
          </table>
        </div>`;
    } else {
      billResults.innerHTML = `<p style="color:red">${result.message}</p>`;
    }
  } catch (error) {
    console.error("Error:", error);
    billResults.innerHTML = `<p style="color:red">Server error. Try again later.</p>`;
  }
});
