import { Router } from 'express';
import auth from '../middlewares/auth.middleware.js';
import isAdmin from '../middlewares/admin.middleware.js';
import { purchase, getAll, getMine } from '../controllers/transactions.controller.js';

const router = Router();

router.post('/', auth, purchase);           // buyer: buy an item
router.get('/mine', auth, getMine);         // buyer: own history
router.get('/', auth, isAdmin, getAll);     // admin: all transactions

export default router;
