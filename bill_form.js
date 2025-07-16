const bill_form = document.getElementById('uploadBill');

bill_form.addEventListener('submit', async function (e) {
  e.preventDefault();

  const bill_form_data = new FormData(bill_form);
  const data = Object.fromEntries(bill_form_data.entries());

  if (!data.inTime) {
    data.inTime = getLocalDateTimeString();
  }

  data.inTime = new Date(data.inTime);

  const hasGross = !!data.grossWeight;
  const hasTare = !!data.tareWeight;

  if (!hasGross && !hasTare) {
    alert("Please enter either Gross Weight or Tare Weight.");
    return;
  }

  if (hasGross) data.grossWeight = Number(data.grossWeight);
  else delete data.grossWeight;
                             
  if (hasTare) data.tareWeight = Number(data.tareWeight);
  else delete data.tareWeight;

  if (hasGross && hasTare) {
    data.netWeight = data.grossWeight - data.tareWeight;
  } else {
    delete data.netWeight;
  }


  if (data.charges) {
    data.charges = Number(data.charges);
  } else {
    delete data.charges;
  }

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
      bill_form.reset(); // Optional: reset form after success
    } else {
      alert(result.message || 'Upload failed');
    }
  } catch (error) {
    alert('Error uploading bill: ' + error.message);
  }
});

function getLocalDateTimeString() {
  const now = new Date();
  now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
  return now.toISOString().slice(0, 16);
}
