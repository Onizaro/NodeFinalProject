import { DataTypes, Model } from 'sequelize';
import { sequelize } from './index';
import { User } from './User';
import { Product } from './Product';

export class Order extends Model {
    public id!: number;
    public userId!: number;
    public productId!: number;
    public quantity!: number;
    public status!: string;
}

Order.init(
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
        status: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 'Pending',
        },
    },
    {
        sequelize,
        modelName: 'Order',
    }
);

Order.belongsTo(User, { foreignKey: 'userId' });
Order.belongsTo(Product, { foreignKey: 'productId' });