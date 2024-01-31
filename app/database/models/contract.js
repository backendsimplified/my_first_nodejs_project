export default (sequelize, DataTypes) => {
  const Contract = sequelize.define(
    "Contract",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        unique: true,
      },
      firstName: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      phoneNumber: {
        type: DataTypes.STRING(40),
        allowNull: false,
      },
    },
    { tableName: "Contracts" }
  );

  return Contract;
};
