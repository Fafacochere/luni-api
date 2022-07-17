import{ Router, Request, Response } from 'express';
import { dataService } from "../services/DataService";

const dataRouter = Router();

dataRouter.get('/', (req: Request, res: Response) => {
    try {
        dataService.getAllData().then((results: any) => {
            res.send({
                user: res.locals.userInfo,
                data: {
                    programs: results
                }
            });
        })
    } catch (error) {
        console.error(error.message)
    }
})

export default dataRouter;