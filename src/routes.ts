import { Router, Request, Response } from 'express';

const router: Router = Router();

// get, post, put, delete (CRUD)

/**
 * 
 */
router.get('/', (req: Request, res: Response) => {
    res.status(200).send('Welcome to the MENTS API');
});

export default router;