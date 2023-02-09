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
  port: 3001,
}
