import { Router, Request, Response } from 'express';
import {
    createProduct,
    getAllProducts,
    getProductById,
    updateProductById,
    deleteProductById,
    getProductsByQuery
} from './controllers/productController';
import { loginUser, registerUser, verifyToken } from './controllers/authController';

const router: Router = Router();

/**
 * 
 */
router.get('/', (req: Request, res: Response) => {
    res.status(200).send('Welcome to the MENTS API');
});

// auth
router.post('/user/register', registerUser);
router.post('/user/login', loginUser);


// create
router.post('/products', verifyToken, createProduct);

// gets
router.get('/products', getAllProducts);
router.get('/products/:id', getProductById);
router.get('/products/query/:key/:val', getProductsByQuery);

// update + delete
router.put('/products/:id', verifyToken, updateProductById);
router.delete('/products/:id', verifyToken, deleteProductById);


export default router;