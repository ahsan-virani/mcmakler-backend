import express from 'express';

import hello from '../controllers';
import neo from './neo';

const router = express.Router();

router.use('/neo', neo);

router.get('/', hello);

export default router;
