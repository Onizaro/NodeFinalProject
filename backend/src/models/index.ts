import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize('postgres://username:password@localhost:5432/online_shop', {
    dialect: 'postgres',
});