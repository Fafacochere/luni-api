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

    checkUserExists = async (id: string): Promise<boolean> => {
        const query = `SELECT id FROM users WHERE idfv = '${id}'`;
        return await mysqlManager.rawQuery(query).then((results: any) => {
            return results[0].length > 0;
        });
    }

    createNewUser = async (idfv: string) => {
        let buff = Buffer.from(idfv);
        const token = buff.toString('base64');
        return await mysqlManager.insert('users', { idfv }).then( async (result) => {
            const userId = (result[0] as ResultSetHeader).insertId;
            return await mysqlManager.insert('users_token', { user_id: userId, token }).then(() => {
                return {
                    id: userId,
                    token
                }
            })
        });
    }
}

export const userService = new UserService();