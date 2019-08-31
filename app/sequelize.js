const Sequelize = require('sequelize');

const sequelize = new Sequelize('apitest', 'apitest', 'apitest', {
  dialect: 'postgres',
  host: '/run/postgresql',
  define: {
    timestamps: false,
    underscored: true,
  },
});

const models = {
  Meta: sequelize.import('./models/meta'),
  Object: sequelize.import('./models/object'),
  Entity: sequelize.import('./models/entity'),
};

Object.keys(models).forEach(model => {
  if (models[model].associate) {
    models[model].associate(models);
  }
});

module.exports = sequelize;
