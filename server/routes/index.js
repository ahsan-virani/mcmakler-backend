import express from 'express';

import { hello, getInitalData } from '../controllers';
import neo from './neo';

const router = express.Router();

router.use('/neo', neo);

router.get('/', hello);
router.get('/get-initial-data', getInitalData);

export default router;
