module.exports = {
  db: {
    database: 'tasks',
    username: '',
    password: '',
    params: {
      dialect: 'sqlite',
      storage: 'db.sqlite', // 'path/to/database.sqlite'
      define: {
        underscored: true,
      },
    },
  },
  auth: {
    secret: 't4$k-AP1',
    session: { session: false }
  },
  cors: {
    origin: ['http://localhost:3002', 'http://127.0.0.1:3002'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
  },
  port: 3001,
}
