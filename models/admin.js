import Sequelize from "sequelize";

import sequelize from "../utilities/database.js";

const Admin = sequelize.define("admin", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
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

  isAdmin: {
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

export default Admin;
