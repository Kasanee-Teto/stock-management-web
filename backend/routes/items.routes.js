import { Router } from 'express';
import auth from '../middlewares/auth.middleware.js';
import isAdmin from '../middlewares/admin.middleware.js';
import { getAll, getOne, create, update, updateStock, remove } from '../controllers/items.controller.js';

const router = Router();

router.get('/', getAll);
router.get('/:id', getOne);
router.post('/', auth, isAdmin, create);
router.put('/:id', auth, isAdmin, update);
router.patch('/:id/stock', auth, isAdmin, updateStock);
router.delete('/:id', auth, isAdmin, remove);

export default router;
