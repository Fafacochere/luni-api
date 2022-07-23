import{ Router, Request, Response } from 'express';
import { dataService } from "../services/DataService";
import auth from "../middlewares/auth";
import {redisManager} from "../utils/redisManager";
import {dataCategory} from "../interfaces/Category";

const dataRouter = Router();

dataRouter.get('/', auth, (req: Request, res: Response) => {
    try {
        const cacheKey = 'dataCache';
        redisManager.getKey(cacheKey).then((value) => {
            if (!!value) {
                res.send({
                    user: res.locals.userInfo,
                    data: {
                        programs: JSON.parse(value)
                    }
                });
                return;
            } else {
                dataService.getAllData().then((results: any) => {
                    redisManager.setKey(cacheKey, JSON.stringify(results))
                    res.send({
                        user: res.locals.userInfo,
                        data: {
                            programs: results
                        }
                    });
                });
            }
        });
    } catch (error) {
        res.status(500).send({ 'message': error.message});
    }
})

export default dataRouter;