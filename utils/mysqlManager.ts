import mysql from 'mysql2';
import { dataSqlManager } from "../interfaces/common";


const db = mysql.createPool({
    host: process.env.MYSQL_HOSTNAME,
    port: +process.env.MYSQL_PORT ?? 3306,
    database: process.env.MYSQL_DATABASE_NAME,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    waitForConnections: true,
    connectionLimit: 400,
    queueLimit: 0
});

class MysqlManager {
    testConnection = () => {
        db.query('SHOW TABLES;', function (error, results) {
            if (error) throw error;
            return results;
        });
    };

    rawQuery = async (query: string): Promise<any> => {
        return await db.promise().query({sql: query});
    };

    insert = (table: string, data: {[field: string]: number | string}) => {
        const keys = Object.keys(data);
        const values = this.valuesForQueries(data);
        const query = `INSERT INTO ${table} (${keys}) VALUES (${values})`;
        return db.promise().query(query);
    };

    valuesForQueries = (data: dataSqlManager) => {
        return Object.values(data).map((item) => {
            return typeof item === 'number' ? item : `'${item}'`;
        });
    };
}
export const mysqlManager = new MysqlManager();