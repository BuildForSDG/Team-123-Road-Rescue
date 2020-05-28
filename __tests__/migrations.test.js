
const Umzug = require('umzug');
const db = require('../server/database/models/index');


describe('custom resolver', () => {
  it('it can run migrations', async () => {
    const migrationsConfig = {
      storage: 'sequelize',
      storageOptions: {
        sequelize: db.sequelize,
        modelName: 'SequelizeMeta' // No need to specify, because this is default behaviour
      },
      migrations: {
        params: [
          db.sequelize.getQueryInterface(),
          db.sequelize.constructor
        ],
        path: '../server/database/migrations', // path to folder containing migrations
        pattern: /\.js$/
      }
    };

    const migrator = new Umzug(migrationsConfig);


    // Run migrations & seeds
    migrator.up().then(() => {

    });

    migrator.down().then(() => {

    });
  });
});
