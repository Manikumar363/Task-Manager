const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('express').json;
const db = require('./models');

dotenv.config();

const PORT = process.env.PORT || 4000;

const app = express();

// enable CORS for frontend (allows requests from localhost:3000 during development)
app.use(cors());
app.use(bodyParser());

app.get('/', (req, res) => res.json({ ok: true }));

const tasksRouter = require('./routes/tasks')(db);
app.use('/tasks', tasksRouter);

async function start() {
  try {
    await db.sequelize.authenticate();
    // sync models (for the assessment keep it simple)
    await db.sequelize.sync();

    // helpful startup logging
    const dialect = db.sequelize.getDialect();
    if (process.env.DATABASE_URL) {
      console.log(`Using database dialect: ${dialect} (DATABASE_URL provided)`);
    } else {
      console.log(`Using database dialect: ${dialect} (sqlite fallback)`);
    }

    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (err) {
    console.error('Failed to start server', err);
    process.exit(1);
  }
}

if (require.main === module) start();

module.exports = app;
