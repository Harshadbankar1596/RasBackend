import express from 'express';

const router = express.Router();

import { getallTikets, BookTicket, verifyPayment } from '../controller/usercontroller.js';

router.get('/get-tikets', getallTikets);
router.post('/book-tiket', BookTicket);
router.post('/verify-payment', verifyPayment);

export default router;