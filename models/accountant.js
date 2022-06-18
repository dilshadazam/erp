import Sequelize from "sequelize";

import sequelize from "../utilities/database.js";
import admin from "./admin.js";

const Accountant = sequelize.define("accountant", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },

  adminId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: admin,
      key: "id",
    },
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  profileImageUrl: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  isAccountant: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  isAuthorized: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  isActive: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  refreshToken: {
    type: Sequelize.STRING,
    allowNull: true,
  },
});

export default Accountant;
