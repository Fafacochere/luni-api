import{ Router, Request, Response } from 'express';
import {userService} from "../services/UserService";

const userRouter = Router();

userRouter.get('/', (_req: Request, res: Response) => {
    res.send({"message": 'Welcome to user part of this API'});
});

userRouter.put('/:id', async (req: Request, res: Response) => {
    const {headers} = req;
    if(!headers.idfv) {
        res.status(401).send({ 'message': 'Invalid idfv for this user'});
    }
    const token = headers.idfv as string;
    const existingUser = await userService.checkUserExists(token, +req.params.id);
    if (!existingUser) {
        res.status(401).send({ 'message': 'Update token failed'});
    }
    res.send(await userService.updateToken(+req.params.id, token));
});

export default userRouter;