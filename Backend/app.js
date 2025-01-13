import cookieParser from 'cookie-parser';
import express from 'express';
import morgan from 'morgan';
import connect from './db/db.js';
import userRoutes from './routes/user.routes.js';

connect();


const app=express();

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser()); 
app.use('/user',userRoutes); 


app.get('/',(req,res)=>{
    res.send('Hello World');
});
export default app;