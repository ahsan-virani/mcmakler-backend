import express from 'express';

import neo from '../controllers/neo';

const router = express.Router();


router.get('/all', neo.all);

router.get('/hazardous', neo.hazardous);
///neo/fastest?hazardous=(true|false)
router.get('/fastest', neo.fastest);
// best-year
router.get('/best-year', neo.bestYear);
router.get('/best-month', neo.bestMonth);

export default router;
