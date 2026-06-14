import sequelize from '../config/database.js';
import { Transaction, Item, User } from '../models/index.js';

export const purchase = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const { itemId, quantity } = req.body;
    if (!itemId || !quantity || quantity < 1) {
      await t.rollback();
      return res.status(400).json({ message: 'itemId and quantity (>=1) are required' });
    }

    const item = await Item.findByPk(itemId, { transaction: t, lock: true });
    if (!item) { await t.rollback(); return res.status(404).json({ message: 'Item not found' }); }
    if (item.stock < quantity) { await t.rollback(); return res.status(409).json({ message: 'Insufficient stock' }); }

    const totalPrice = parseFloat(item.price) * quantity;
    await item.decrement('stock', { by: quantity, transaction: t });

    const tx = await Transaction.create(
      { userId: req.user.id, itemId, quantity, totalPrice },
      { transaction: t }
    );

    await t.commit();
    res.status(201).json({ ...tx.toJSON(), item: { id: item.id, name: item.name } });
  } catch (err) {
    await t.rollback();
    res.status(500).json({ message: err.message });
  }
};

export const getAll = async (req, res) => {
  try {
    const transactions = await Transaction.findAll({
      include: [
        { model: User, as: 'user', attributes: ['id', 'name', 'email'] },
        { model: Item, as: 'item', attributes: ['id', 'name', 'price'] },
      ],
      order: [['createdAt', 'DESC'], ['id', 'ASC']],
    });
    res.json(transactions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getMine = async (req, res) => {
  try {
    const transactions = await Transaction.findAll({
      where: { userId: req.user.id },
      include: [{ model: Item, as: 'item', attributes: ['id', 'name', 'price', 'imageUrl'] }],
      order: [['createdAt', 'DESC'], ['id', 'ASC']],
    });
    res.json(transactions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
