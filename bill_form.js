window.addEventListener('DOMContentLoaded', () => {
  const inTimeInput = document.getElementById('inTime');
  if (!inTimeInput.value) {
    const now = new Date();
    const localISOTime = now.toISOString().slice(0, 16);
    inTimeInput.value = localISOTime;
  }
});

const bill_form = document.getElementById('uploadBill');

bill_form.addEventListener('submit', async function (e) {
  e.preventDefault();

  const bill_form_data = new FormData(bill_form);
  const data = Object.fromEntries(bill_form_data.entries());

  data.inTime = new Date(data.inTime);
  data.grossWeight = Number(data.grossWeight);
  data.tareWeight = Number(data.tareWeight);
  data.netWeight = Number(data.netWeight);
  data.charges = Number(data.charges);

  if (data.outTime) {
    data.outTime = new Date(data.outTime);
  } else {
    delete data.outTime;
  }

  try {
    const response = await fetch(bill_form.action, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    if (response.ok) {
      alert('Bill uploaded successfully');
    } else {
      alert(result.message || 'Upload failed');
    }
  } catch (error) {
    alert('Error uploading bill: ' + error.message);
  }
});


