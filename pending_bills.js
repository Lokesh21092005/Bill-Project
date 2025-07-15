async function fetchPendingBills() {
  const res = await fetch('/api/v1/bill/pending');
  const data = await res.json();
  const tbody = document.querySelector('#billsTable tbody');
  tbody.innerHTML = '';

  data.bills.forEach(bill => {
    const tr = document.createElement('tr');

    tr.innerHTML = `
      <td>${bill.serialNo || '-'}</td>
      <td><input type="number" value="${bill.grossWeight || ''}" id="gross-${bill._id}"/></td>
      <td><input type="number" value="${bill.tareWeight || ''}" id="tare-${bill._id}"/></td>
      <td><input type="datetime-local" id="outTime-${bill._id}"/></td>
      <td><button onclick="updateBill('${bill._id}')">Update</button></td>
    `;

    tbody.appendChild(tr);
  });
}

async function updateBill(id) {
  const gross = document.getElementById(`gross-${id}`).value;
  const tare = document.getElementById(`tare-${id}`).value;
  const outTime = document.getElementById(`outTime-${id}`).value;

  const body = {};
  if (gross) body.grossWeight = gross;
  if (tare) body.tareWeight = tare;
  if (outTime) body.outTime = outTime;

  const res = await fetch(`/api/v1/bill/${id}/complete`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });

  const result = await res.json();
  if (result.success) {
    alert("Updated successfully");
    fetchPendingBills();
  } else {
    alert("Update failed");
  }
}

fetchPendingBills();
