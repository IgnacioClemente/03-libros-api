import express from 'express';
import morgan from 'morgan';
import 'dotenv/config'
import booksRoutes from './src/books/book.routes.js'
import authorRoutes from './src/author/author.routes.js'
import userRoutes from './src/user/user.routes.js'
import authRoutes from './src/auth/auth.routes.js'


const app = express();
const port = parseInt(process.env.APIBOOK_PORT);

app.use(morgan('combined'));
app.use(express.json());

app.get('/', (req,res) =>{
    res.status(200).json('OK');
});

app.use('/api', booksRoutes);
app.use('/api', authorRoutes);
app.use('/api', userRoutes);
app.use('/api', authRoutes);


app.listen(port, () =>{
    console.log('Servidor funcionando');
});