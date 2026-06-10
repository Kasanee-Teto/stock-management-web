import express from 'express';
import { getAll, getOne, create, update, updateStock, remove } from '../controllers/product.controller.js';
import auth from '../middleware/auth.js';
import isAdmin from '../middleware/isAdmin.js';

const router = express.Router();

router.get('/', getAll);
router.get('/:id', getOne);
router.post('/', auth, isAdmin, create);
router.put('/:id', auth, isAdmin, update);
router.patch('/:id/stock', auth, isAdmin, updateStock);
router.delete('/:id', auth, isAdmin, remove);

export default router;