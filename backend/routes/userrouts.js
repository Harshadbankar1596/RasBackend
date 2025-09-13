import express from 'express';

const router = express.Router();

import { getallTikets , BookTicket  } from '../controller/usercontroller.js';

router.get('/get-tikets', getallTikets);
router.post('/book-tiket', BookTicket);

export default router;