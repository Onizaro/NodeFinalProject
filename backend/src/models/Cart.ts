import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../db';
import { Product } from './Product';
import { User } from './User';

export class Cart extends Model {
    public id!: number;
    public userId!: number;
    public productId!: number;
    public quantity!: number;
}

Cart.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        productId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: 'Cart',
    }
);

Cart.belongsTo(User, { foreignKey: 'userId' });
Cart.belongsTo(Product, { foreignKey: 'productId' });
