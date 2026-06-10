import express from 'express';
import { purchase, getMine, getAll } from '../controllers/transaction.controller.js';
import auth from '../middleware/auth.js';
import isAdmin from '../middleware/isAdmin.js';

const router = express.Router();

router.post('/', auth, purchase);           // buyer: buy an item
router.get('/mine', auth, getMine);         // buyer: own history
router.get('/', auth, isAdmin, getAll);     // admin: all transactions

export default router;
