const request = require('supertest');
const dotenv = require('dotenv');
dotenv.config();

const { Sequelize } = require('sequelize');

// Use a separate in-memory sqlite for tests if DATABASE_URL not set to a test PG.
const databaseUrl = process.env.TEST_DATABASE_URL || 'sqlite::memory:';

const sequelize = new Sequelize(databaseUrl, { logging: false });

// Create a fresh Task model for tests
const TaskModel = require('../src/models/task')(sequelize);

const createApp = async () => {
  await sequelize.sync({ force: true });
  const app = require('../src/index');
  // override app's db reference by re-requiring routes with test model
  const db = { sequelize, Task: TaskModel };
  const tasksRouter = require('../src/routes/tasks')(db);
  app._router.stack = app._router.stack.filter(r => !(r.route && r.route.path && r.route.path.startsWith('/tasks')));
  app.use('/tasks', tasksRouter);
  return app;
};

describe('Tasks API', () => {
  let app;

  beforeAll(async () => {
    app = await createApp();
  });

  test('creates, lists, toggles and deletes a task', async () => {
    const payload = { title: 'Test task', description: 'A test' };
    const createRes = await request(app).post('/tasks').send(payload);
    expect(createRes.status).toBe(201);
    expect(createRes.body.title).toBe(payload.title);

    const listRes = await request(app).get('/tasks');
    expect(listRes.status).toBe(200);
    expect(Array.isArray(listRes.body)).toBe(true);
    expect(listRes.body.length).toBeGreaterThan(0);

    const id = createRes.body.id;
    const toggleRes = await request(app).patch(`/tasks/${id}/toggle`).send();
    expect(toggleRes.status).toBe(200);
    expect(toggleRes.body.status).toBe('done');

    const delRes = await request(app).delete(`/tasks/${id}`);
    expect(delRes.status).toBe(204);
  });
});
