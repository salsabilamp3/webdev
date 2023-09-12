import { Sequelize } from "sequelize";

const db = new Sequelize("smission_db", "root", "", {
    host: "localhost",
    dialect: "mysql"
});

export default db;