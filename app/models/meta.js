module.exports = (sequelize, DataTypes) => {
  const Meta = sequelize.define('Meta', {
    title: {
      type: DataTypes.STRING(160),
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING(300),
      allowNull: false,
    },
  }, {
    name: {
      plural: 'Meta',
      singular: 'Meta',
    }
  });

  Meta.associate = models => {
    Meta.hasOne(models.Object, {
      as: 'Object',
      foreignKey: 'metaId',
    });
  };

  return Meta;
};
