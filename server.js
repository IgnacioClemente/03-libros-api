import express from 'express';
import booksRoutes from './src/books/book.routes.js'
import authorRoutes from './src/author/author.routes.js'
import userRoutes from './src/user/user.routes.js'

const app = express();
const port = 3000;

app.use(express.json());

app.get('/', (req,res) =>{
    res.status(200).json('OK');
});

app.use('/api', booksRoutes);
app.use('/api', authorRoutes);
app.use('/api', userRoutes);


app.listen(port, () =>{
    console.log('Servidor funcionando');
});