import{ Router, Request, Response } from 'express';

const dataRouter = Router();

dataRouter.get('/', (req: any, res: any) => {
    res.send({"message": 'Welcome to data part of this API'})
})

export default dataRouter;