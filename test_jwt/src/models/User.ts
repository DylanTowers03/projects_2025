import { DataTypes, Model } from 'sequelize';
import { database } from '../database/db';

export interface IUser {
  id?: number;
  username: string;
  email: string;
  password: string;
}

export class User extends Model<IUser> {
    id!: number;
    username!: string;
    email!: string;
    password!: string;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: database,
    tableName: 'users', // Nombre de la tabla en la BD
    timestamps: false, // Si no usas createdAt y updatedAt
  }
);
