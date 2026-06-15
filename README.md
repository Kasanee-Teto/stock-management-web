# Stockify

Full-stack inventory & shop app — React + Vite · Express + Node.js · PostgreSQL + Sequelize · Deployed on Vercel / Render / Neon.

---

## Tech Stack

| Layer    | Tech                       | Hosting    |
|----------|----------------------------|------------|
| Frontend | React + Vite (ESM)         | Vercel     |
| Backend  | Express + Node.js (ESM)    | Railway    |
| Database | PostgreSQL + Sequelize ORM | Neon.tech  |

---

## Local Setup

### 1. Clone

```bash
git clone https://github.com/YOUR_USERNAME/stockify.git
cd stockify
```

### 2. Backend

```bash
cd backend
cp .env.example .env    # fill in DATABASE_URL, JWT_SECRET
npm install
```

### 3. Run migrations & seed demo data

```bash
npm run db:migrate      # creates Users, Items, Transactions tables
npm run db:seed         # inserts demo admin + buyer + 4 items
```

### 4. Start backend

```bash
npm run dev             # node --watch server.js on port 5000
```

### 5. Frontend

```bash
cd ../frontend
cp .env.example .env    # set VITE_API_URL=http://localhost:5000/api
npm install
npm run dev             # vite dev server on port 5173
```

---

## Demo Credentials (after seeding)

| Role  | Email                  | Password  |
|-------|------------------------|-----------|
| Admin | admin@stockify.com     | admin123  |
| Buyer | buyer@stockify.com     | buyer123  |

### Migration commands

```bash
npm run db:migrate          # apply all pending migrations
npm run db:migrate:undo     # roll back last migration
npm run db:seed             # run all seeders
npm run db:seed:undo        # undo all seeders
npm run db:reset            # undo + migrate + seed (dev only)
```

### Adding a new migration

```bash
npx sequelize-cli migration:generate --name add-category-to-items
# Edit the generated .cjs file in migrations/
npm run db:migrate
```

---

## ESM + Sequelize CLI Notes

- All app code (`models/`, `controllers/`, `routes/`, `server.js`) uses **ESM** (`import/export`)
- Migration and seeder files use **`.cjs`** extension — sequelize-cli requires CommonJS
- `config/sequelize.cjs` is the CLI config only; `config/database.js` (ESM) is used by the app
- `server.js` calls `sequelize.authenticate()` only — **never** `sync()`. Schema is owned by migrations.

---

## Roles & Permissions

| Feature              | Admin | Buyer |
|----------------------|-------|-------|
| Add / edit items     | ✓     |       |
| Update stock         | ✓     |       |
| Delete items         | ✓     |       |
| View all transactions| ✓     |       |
| Browse shop          |       | ✓     |
| Purchase items       |       | ✓     |
| View own orders      |       | ✓     |

---

## API Reference

| Method | Endpoint                 | Auth    | Description           |
|--------|--------------------------|---------|-----------------------|
| POST   | /api/auth/register       | Public  | Register              |
| POST   | /api/auth/login          | Public  | Login                 |
| GET    | /api/auth/me             | Any     | Current user          |
| GET    | /api/items               | Public  | List items            |
| POST   | /api/items               | Admin   | Create item           |
| PUT    | /api/items/:id           | Admin   | Update item           |
| PATCH  | /api/items/:id/stock     | Admin   | Update stock only     |
| DELETE | /api/items/:id           | Admin   | Delete item           |
| POST   | /api/transactions        | Buyer   | Purchase item         |
| GET    | /api/transactions/mine   | Buyer   | Own order history     |
| GET    | /api/transactions        | Admin   | All transactions      |
