import express from 'express';
import Bill from '../models/bill.model.js';
const router = express.Router();


router.post('/', async (req, res) => {
  const { inTime, grossWeight, tareWeight, outTime, charges, party, serialNo, material } = req.body;

  if (grossWeight == null && tareWeight == null) {
    return res.status(400).json({ message: "At least grossWeight or tareWeight is required." });
  }

  const bill = new Bill({
    inTime: inTime ? new Date(inTime) : new Date(),
    grossWeight: grossWeight != null ? Number(grossWeight) : undefined,
    tareWeight: tareWeight != null ? Number(tareWeight) : undefined,
    outTime: outTime ? new Date(outTime) : undefined,
    charges,
    party,
    serialNo,
    material,
  });

  if (bill.grossWeight != null && bill.tareWeight != null) {
    bill.netWeight = bill.grossWeight - bill.tareWeight;
  }

  await bill.save();
  res.json({ success: true, bill });
});

// Complete/update a pending bill
router.put('/:id/complete', async (req, res) => {
  const { grossWeight, tareWeight, outTime } = req.body;
  const update = {};

  if (grossWeight != null) update.grossWeight = Number(grossWeight);
  if (tareWeight != null) update.tareWeight = Number(tareWeight);
  if (outTime) update.outTime = new Date(outTime);

  const bill = await Bill.findById(req.params.id);
  if (!bill) return res.status(404).json({ message: "Bill not found" });

  Object.assign(bill, update);

  
  if (bill.grossWeight != null && bill.tareWeight != null) {
    bill.netWeight = bill.grossWeight - bill.tareWeight;
  }

  await bill.save();
  res.json({ success: true, bill });
});

// Get pending bills
router.get('/pending', async (req, res) => {
  const pendingBills = await Bill.find({
    $or: [
      { grossWeight: { $exists: false } },
      { grossWeight: null },
      { tareWeight: { $exists: false } },
      { tareWeight: null },
      { outTime: { $exists: false } },
      { outTime: null }
    ]
  });

  res.json({ success: true, bills: pendingBills });
});

export default router;
