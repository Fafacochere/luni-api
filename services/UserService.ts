import {mysqlManager} from "../utils/mysqlManager";
import {UserData} from "../interfaces/User";
import {ResultSetHeader} from "mysql2";

class UserService {
    getUserByToken = async (token: string): Promise<UserData> => {
        const query = `SELECT user_id as id, token FROM users_token WHERE token = '${token}'`;
        return await mysqlManager.rawQuery(query).then((results: any) => {
            const data = results[0];
            if ( data.length === 1) {
                return data[0] as UserData;
            }
        });
    }

    checkUserExists = async (token: string, userId?: number): Promise<boolean> => {
        let query = `SELECT id FROM users WHERE idfv = '${token}'`;
        if (userId) {
            query += ' AND id = ' + userId;
        }
        return await mysqlManager.rawQuery(query).then((results: any) => {
            return results[0].length > 0;
        });
    }

    createNewUser = async (idfv: string) => {
        return await mysqlManager.insert('users', { idfv }).then( async (result) => {
            const userId = (result[0] as ResultSetHeader).insertId;
            return await this.updateToken(userId, idfv);
        });
    }

    updateToken = async (userId: number, idfv: string) => {
        const token = this.encryptIdfv(idfv);
        return await mysqlManager.insert('users_token', { user_id: userId, token }).then(() => {
            return {
                id: userId,
                token
            }
        })
    }

    private encryptIdfv = (id: string): string => {
        let buff = Buffer.from(id);
        return buff.toString('base64');
    }
}

export const userService = new UserService();