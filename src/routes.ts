import { Router, Request, Response } from 'express';
import {
    createProduct,
    getAllProducts,
    getProductById,
    updateProductById,
    deleteProductById,
    getProductsByQuery
} from './controllers/productController';

const router: Router = Router();

/**
 * 
 */
router.get('/', (req: Request, res: Response) => {
    res.status(200).send('Welcome to the MENTS API');
});

// create
router.post('/products', createProduct);

// gets
router.get('/products', getAllProducts);
router.get('/products/:id', getProductById);
router.get('/products/query/:key/:val', getProductsByQuery);

// update + delete
router.put('/products/:id', updateProductById);
router.delete('/products/:id', deleteProductById);


export default router;