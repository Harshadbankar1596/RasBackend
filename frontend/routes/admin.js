import express from 'express';

import { addTiket, getTikets, updateTiket , getallBookings} from '../controller/admincontroller.js';

const router = express.Router();

router.post('/add-ticket', addTiket);
router.get('/get-tikets', getTikets);
router.put('/update-tiket', updateTiket);
router.get('/get-all-bookings', getallBookings);

export default router;