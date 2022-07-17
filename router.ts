import{ Router, Request, Response } from 'express';
import UserRouter from './controllers/UserController';
import DataRouter from './controllers/DataController';

const router = Router();

router.get('/', (req: Request, res: Response) => {
    res.send({'message': 'Hello World !'});
})


router.use('/user', UserRouter)
router.use('/data', DataRouter)

export default router;