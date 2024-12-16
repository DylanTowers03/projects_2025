import { Model, DataTypes } from "sequelize";
import { database } from "../database/db";

export class User extends Model {
  public nombre!: string;
  public edad!: number;

}

export interface UserI {
    nombre: string;
    edad: number;
}

User.init(
  {
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
      },
    edad: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
  },
  {
    tableName: "users",
    sequelize: database,
    timestamps: false
  }
);