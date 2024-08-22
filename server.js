import express from 'express';
import librosRoutes from './src/books/book.routes.js'

const app = express();
const port = 3000;

app.use(express.json());

app.get('/', (req,res) =>{
    res.status(200).json('OK');
});

app.use('/api', librosRoutes);

app.listen(port, () =>{
    console.log('Servidor funcionando');
});