module.exports = (sequelize, DataTypes) => {
  const schema = {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true,
      }
    }
  };

  const Role = sequelize.define('Role', schema, {
    classMethods: {
      associate(models) {
        return Role.hasMany(models.User, {
          as: 'users',
          foreignKey: 'role_id'
        });
      }
    },
    tableName: 'roles',
    underscored: true
  });
  return Role;
};
