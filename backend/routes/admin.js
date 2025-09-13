import express from 'express';

import { addTiket, getTikets, updateTiket } from '../controller/admincontroller.js';

const router = express.Router();

router.post('/add-ticket', addTiket);
router.get('/get-tikets', getTikets);
router.put('/update-tiket', updateTiket);

export default router;