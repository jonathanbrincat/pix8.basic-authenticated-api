module.exports = {
  db: {
    database: 'tasks',
    username: '',
    password: '',
    params: {
      dialect: 'sqlite',
      storage: 'db.sqlite',
      define: {
        underscored: true,
      },
    },
  },
  auth: {
    secret: 't4$k-AP1',
    session: { session: false }
  },
  port: 3001,
}
