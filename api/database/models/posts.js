module.exports = (sequelize, DataTypes) =>
  sequelize.define("post", {
    post_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    user_id: {
      type: DataTypes.INTEGER,
      //Setup user_id as a foreign key
      references: {
        model: "users", //Table name
        key: "user_id" // Column name

      }
    }
  })