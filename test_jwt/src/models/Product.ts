import { DataTypes, Model, Optional } from 'sequelize';
import { database } from '../database/db';

// Interfaces
interface ProductI {
  id?: number;
  name: string;
  stock: number;
  idProductType: number;
}

interface ProductTypeI {
  id?: number;
  name: string;
}

// Models
class Product
  extends Model<ProductI> implements ProductI {
  public id?: number;
  public name!: string;
  public stock!: number;
  public idProductType!: number;

  // Timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

class ProductType
  extends Model<ProductTypeI> implements ProductTypeI {
  public id?: number;
  public name!: string;

  // Timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

// Initialize Models
Product.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    idProductType: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'ProductTypes', // Table name
        key: 'id',
      },
    },
  },
  {
    sequelize:database,
    tableName: 'Products',
    timestamps: true,
  }
);

ProductType.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: database,
    tableName: 'ProductTypes',
    timestamps: true,
  }
);

// Define Relationships
Product.belongsTo(ProductType, {
  foreignKey: 'idProductType',
  as: 'productType',
});

ProductType.hasMany(Product, {
  foreignKey: 'idProductType',
  as: 'products',
});

export { Product, ProductType, ProductI, ProductTypeI };