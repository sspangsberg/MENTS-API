import { Request, Response } from 'express';
import { productModel } from '../models/productModel';
import { connect, disconnect } from '../repository/database';


// CRUD - create, read/get, update, delete

/**
 * Creates a new product in the data source based on the request body
 * @param req 
 * @param res 
 */
export async function createProduct(req: Request, res: Response): Promise<void> {

  const data = req.body;

  try {
    await connect();

    const product = new productModel(data);
    const result = await product.save();

    res.status(201).send(result);
  }
  catch (err) {
    res.status(500).send("Error creating product. Error: " + err);
  }
  finally {
    await disconnect();
  }
}


/**
 * Retrieves all products from the data sources
 * @param req 
 * @param res 
 */
export async function getAllProducts(req: Request, res: Response) {

  try {
    await connect();

    const result = await productModel.find({});

    res.status(200).send(result);
  }
  catch (err) {
    res.status(500).send("Error retrieving products. Error: " + err);
  }
  finally {
    await disconnect();
  }
}


/**
 * Retrieves a product by its id from the data sources
 * @param req 
 * @param res 
 */
export async function getProductById(req: Request, res: Response) {

  try {
    await connect();

    const id = req.params.id;
    const result = await productModel.findById(id);

    res.status(200).send(result);
  }
  catch (err) {
    res.status(500).send("Error retrieving product by id. Error: " + err);
  }
  finally {
    await disconnect();
  }
}





/**
 * Retrieves a product by its id from the data sources
 * @param req 
 * @param res 
 */
export async function getProductsByQuery(req: Request, res: Response) {

  const key = req.params.key;
  const val = req.params.val;

  try {
    await connect();

    const result = await productModel.find({ [key]: { $regex: val, $options: 'i' } });

    res.status(200).send(result);
  }
  catch (err) {
    res.status(500).send("Error retrieving products. Error: " + err);
  }
  finally {
    await disconnect();
  }
}








/**
 * Updates the product by
 * @param req 
 * @param res 
 */
export async function updateProductById(req: Request, res: Response) {

  const id = req.params.id;

  try {
    await connect();

    const result = await productModel.findByIdAndUpdate(id, req.body);

    if (!result) {
      res.status(404).send('Cannot update product with id=' + id);
    }
    else {
      res.status(200).send('Product was succesfully updated.');
    }
  }
  catch (err) {
    res.status(500).send("Error updating product by id. Error: " + err);
  }
  finally {
    await disconnect();
  }
}




/**
 * Retrieves a product by its id from the data sources
 * @param req 
 * @param res 
 */
export async function deleteProductById(req: Request, res: Response) {

  const id = req.params.id;

  try {
    await connect();

    const result = await productModel.findByIdAndDelete(id);

    if (!result) {
      res.status(404).send('Cannot delete product with id=' + id);
    }
    else {
      res.status(200).send('Product was succesfully deleted.');
    }
  }
  catch (err) {
    res.status(500).send("Error deleting product by id. Error: " + err);
  }
  finally {
    await disconnect();
  }
}
