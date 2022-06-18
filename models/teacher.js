import Sequelize from "sequelize";

import sequelize from "../utilities/database.js";
import accountant from "./accountant.js";

const Teacher = sequelize.define("teacher", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },

  accountantId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: accountant,
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
  phone: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  joiningdate: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  higherqualification: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  gender: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  adharcardno: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  address: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  classteacher: {
    type: Sequelize.STRING,
    allowNull: true,
  },

  profileImageUrl: {
    type: Sequelize.STRING,
    allowNull: true,
  },

  isTeacher: {
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

export default Teacher;
