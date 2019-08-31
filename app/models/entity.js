module.exports = (sequelize, DataTypes) => {
  const Entity = sequelize.define('Entity', {
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
  });

  Entity.associate = models => {
    Entity.belongsToMany(models.Object, {
      as: 'Objects',
      through: 'object_has_entities',
      foreignKey: 'entityId',
    });
  };

  return Entity;
};
