import { Router } from 'express';
import productModel from '../dao/models/products.model.js';


const router = Router();

// Creación
router.get('/create', (req, res) => {
    res.render('create', {})
})
router.post("/", async ( req, res ) => {
    const newProduct = req.body;
    const generatedProduct = new productModel(newProduct);
    await generatedProduct.save();
    res.redirect("/products")
})

// Actualización
router.get('/update/:title', async (req, res) => {
    const title = req.params.title;
    const product = await productModel.findOne({ title }).lean().exec();
    res.render('update', { 
        pageTitle: `Actualizando el producto ${title}`,
        product
    })
})
router.put('/:title', async (req, res) => {
    const title = req.params.title;
    const productNewData = req.body
    await productModel.updateOne({ title }, { ...productNewData })
})

// Lectura
router.get('/', async ( req, res ) => {
    const products = await productModel.find().lean().exec()
    res.render( 'products', {
        pageTitle: 'Todos los productos',
        products
    })
})
router.get("/:title", async ( req, res ) => {
    const title = req.params.title;
    const product = await productModel.findOne({ title }).lean().exec()
    res.render('product', { 
        pageTitle: title,
        product 
    })
})
// Eliminar 

router.delete('/:title', async (req, res) => {
    const title = req.params.title
    await productModel.deleteOne({ title })
    res.send(`Producto con el ID [${title}] eliminado exitosamente`)
})
export default router;

