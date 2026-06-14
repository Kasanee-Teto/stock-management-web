import User from './User.js';
import Item from './Item.js';
import Transaction from './Transaction.js';

// Associations
User.hasMany(Transaction, { foreignKey: 'userId', as: 'transactions' });
Transaction.belongsTo(User, { foreignKey: 'userId', as: 'user' });

Item.hasMany(Transaction, { foreignKey: 'itemId', as: 'transactions' });
Transaction.belongsTo(Item, { foreignKey: 'itemId', as: 'item' });

export { User, Item, Transaction };
