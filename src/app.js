import express from 'express';
import handlebars from 'express-handlebars';
import mongoose from 'mongoose';

import productsRouter from './routes/products.router.js';

const app = express();
app.use( express.json())
app.use( express.urlencoded({ extended: true }))

// Motor de plantillas
app.engine('handlebars', handlebars.engine())
app.set('views', './src/views')
app.set('view engine', 'handlebars')

// Archivos estáticos
app.use( express.static( "./src/public" ))

app.get('/', ( req, res ) => res.status( 200 ).send( 'Server OK!' ))

app.use('/products', productsRouter)


const PORT = '8080'
mongoose.set('strictQuery', false)

try {
    await mongoose.connect( 'mongodb+srv://admin:nVmcprqyKBizD14o@ecommerce.suvajub.mongodb.net/ecommerce')
    app.listen( PORT, () => console.log(`Server up on port ${ PORT }`))
} catch ( error ){
    console.log(`No se pudo conectar con la base de datos: \n${ error }`)
}