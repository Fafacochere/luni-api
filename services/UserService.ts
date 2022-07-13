import{ Router, Request, Response } from 'express';

const userRouter = Router();

userRouter.get('/', (req: any, res: any) => {
    res.send({"message": 'Welcome to user part of this API'})
})

export default userRouter;