import{ Router, Request, Response } from 'express';
import UserService from './services/UserService';
import DataService from './services/DataService';

const router = Router();

router.get('/', (req: Request, res: Response) => {
    res.send({'message': 'Hello World !'});
})

router.use('/user', UserService)
router.use('/data', DataService)

export default router;