import{ Request, Response } from 'express';
import {userService} from "../services/UserService";

export default async (req: Request, res: Response, next: any) => {
    const headers = req.headers;
    if(!headers.idfv && !headers.authorization) {
        res.status(401).send({ "message": "Please include your IDFV in the headers or token"});
    }
    if (headers.authorization) {
        const userInfo = await userService.getUserByToken(headers.authorization);
        if (userInfo) {
            res.locals.userInfo = userInfo;
            next();
        } else {
            res.status(401).send({ "message": "Invalid token, please consider refresh it"});
        }
    }
    const identifier = headers.idfv as string;
    const userExists = await userService.checkUserExists(identifier);
    if (!userExists) {
        res.locals.userInfo = await userService.createNewUser(identifier);
        next();
    } else {
        res.status(401).send({ "message" : "Token already set for this user, please include it in Authorization header or refresh it"});
    }
}