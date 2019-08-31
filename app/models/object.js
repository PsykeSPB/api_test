module.exports = (sequelize, DataTypes) => {
  const Object = sequelize.define('Object', {
    name: DataTypes.STRING(50),
    slug: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: true,
      },
    },
  });

  Object.associate = models => {
    Object.belongsTo(models.Meta, {
      as: 'Meta',
      foreignKey: 'metaId',
    });

    Object.belongsToMany(models.Entity, {
      as: 'Entities',
      through: 'object_has_entities',
      foreignKey: 'object_id',
    })
  };

  return Object;
};
