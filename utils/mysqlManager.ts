import mysql, {Connection} from 'mysql2';

class MysqlManager {
    private mysqlManager: Connection;

    constructor() {
        this.mysqlManager = mysql.createConnection({
            host: '172.22.0.254',
            port: 3306,
            database: process.env.MYSQL_DATABASE_NAME,
            user: process.env.MYSQL_USER,
            password: process.env.MYSQL_PASSWORD,
        });
    }

    connect = () => {
        this.mysqlManager.connect();
        return this;
    }

    testConnection = () => {
        this.mysqlManager.query('SHOW TABLES;', function (error, results, fields) {
            if (error) throw error;
            return results;
        });
    }

    rawQuery = (query: string): any => {
        return this.mysqlManager.promise().query(query)
    }

    stop = () => {
        this.mysqlManager.end();
    }
}
export const mysqlManager = new MysqlManager();