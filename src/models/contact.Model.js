import { DataTypes } from "sequelize";
import sequelize from "../db/index.js";

const Contact = sequelize.define("Contact", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("pending", "read", "replied"),
      defaultValue: "pending",
    },
    agreement:{
        type:DataTypes.BOOLEAN,
        allowNull:true
    }
  },
{
    timestamps: true,

    tableName: "contacts",
});
  
export default Contact;
