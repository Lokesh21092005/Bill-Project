const bill_form = document.getElementById('uploadBill');

bill_form.addEventListener('submit', async function (e) {
  e.preventDefault(); 

  const bill_form_data = new FormData(bill_form);
  const data = Object.fromEntries(bill_form_data.entries());
  data.inTime = new Date(data.inTime);
    data.outTime = new Date(data.outTime);
    data.grossWeight = Number(data.grossWeight);
    data.tareWeight = Number(data.tareWeight);
    data.netWeight = Number(data.netWeight);
    data.charges = Number(data.charges);

  try {
    const response = await fetch(bill_form.action, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });

    if (response.ok) {
        alert("Bill Uploaded Successfully!")
      window.location.href = "https://lokesh21092005.github.io/Bill-Project/upload_bill.html";
    } else {
      const result = await response.json();
      alert(result.message || "Uploading bill failed");
    }
  } catch (error) {
    console.error("Error:", error);
    alert("An unexpected error occurred. Please try again.");
  }
});
