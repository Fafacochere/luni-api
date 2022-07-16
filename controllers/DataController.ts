import{ Router, Request, Response } from 'express';
import { dataService } from "../services/DataService";
import {Category} from "../interfaces/Category";

const dataRouter = Router();

dataRouter.get('/', (req: Request, res: Response) => {
    dataService.getAllData().then((results: any) => {
        res.send({
            user: {
                id: 1,
                token: 'ABCDEFGHIJ'
            },
            data: {
                programs: results
            }
        });
    })
})

export default dataRouter;