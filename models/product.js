import { Sequelize } from "sequelize";
const { DataTypes } = Sequelize;
const products = db.define("Products", {
  name: {
    type: DataTypes.STRING,
  },
});
export default products;
