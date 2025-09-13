import express from 'express';

import { addTiket, getTikets, updateTiket , getallBookings, deleteTiket} from '../controller/admincontroller.js';

const router = express.Router();

router.post('/add-ticket', addTiket);
router.get('/get-tikets', getTikets);
router.put('/update-tiket', updateTiket);
router.get('/get-all-bookings', getallBookings);
router.delete('/delete-tiket/:id', deleteTiket);

export default router;