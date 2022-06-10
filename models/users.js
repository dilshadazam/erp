import Sequelize from "sequelize";

import sequelize from "../utilities/database.js";

const User = sequelize.define("user", {
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
  phone: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  otp: {
    type: Sequelize.INTEGER,
    allowNull: true,
  },
  profileImageUrl: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  isAdmin: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  isPrincipal: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  isTeacher: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  isStudent: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
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

export default User;
