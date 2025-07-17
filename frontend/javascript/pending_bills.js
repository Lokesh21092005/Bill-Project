  async function fetchPendingBills() {
  const res = await fetch('https://bill-project-nidq.onrender.com/api/v1/bill/pending');
  const { bills } = await res.json();

  const container = document.getElementById('pendingBillsContainer');
  container.innerHTML = '';

  bills.forEach(bill => {
    const div = document.createElement('div');
    div.innerHTML = `
      <div style="border:1px solid #ccc; padding:10px; margin:10px;">
        <p><strong>Serial No:</strong> ${bill.serialNo}</p>
        <p><strong>Vehicle No:</strong> ${bill.vehicleNo}</p>
        <p><strong>Gross:</strong> ${bill.grossWeight || '-'} | <strong>Tare:</strong> ${bill.tareWeight || '-'}</p>
        <input type="number" placeholder="Gross Weight" id="gross-${bill._id}" />
        <input type="number" placeholder="Tare Weight" id="tare-${bill._id}" />
        <input type="datetime-local" placeholder="Out Time" id="out-${bill._id}" />
        <button onclick="completeBill('${bill._id}')">Complete</button>
      </div>
    `;
    container.appendChild(div);
  });
}

fetchPendingBills();

async function completeBill(id) {
  const gross = document.getElementById(`gross-${id}`).value;
  const tare = document.getElementById(`tare-${id}`).value;
  const outTime = document.getElementById(`out-${id}`).value;

  const data = {};
  if (gross) data.grossWeight = Number(gross);
  if (tare) data.tareWeight = Number(tare);
  if (outTime) data.outTime = new Date(outTime);

  const res = await fetch(`https://bill-project-nidq.onrender.com/api/v1/bill/${id}/complete`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  const result = await res.json();
  if (result.success) {
    alert('Updated successfully');
    fetchPendingBills();
  } else {
    alert(result.message);
  }
}

window.completeBill = completeBill;
