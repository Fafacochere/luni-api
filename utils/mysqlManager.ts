import mysql, {Connection} from 'mysql2';


const db = mysql.createConnection({
    host: '172.22.0.254',
    port: 3306,
    database: process.env.MYSQL_DATABASE_NAME,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
});
class MysqlManager {
    connect = () => {
        db.connect();
        return this;
    }

    testConnection = () => {
        db.query('SHOW TABLES;', function (error, results, fields) {
            if (error) throw error;
            return results;
        });
    }

    rawQuery = (query: string): any => {
        return db.promise().query(query);
    }

    insert = (table: string, data: {[field: string]: number | string}) => {
        const keys = Object.keys(data);
        const values = Object.values(data).map((item) => {
            return typeof item === 'number' ? item : `'${item}'`;
        });
        const query = `INSERT INTO ${table} (${keys}) VALUES (${values})`;
        return db.promise().query(query);
    }

    stop = () => {
        db.end();
    }
}
export const mysqlManager = new MysqlManager();