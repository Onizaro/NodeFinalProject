import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize('online_shop', 'postgres', '0000', {
    host: 'localhost',
    dialect: 'postgres',
});
