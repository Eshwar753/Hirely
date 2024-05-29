import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

import connectDB from './config/db.js';
import {notFound, errorHandler} from "./middleware/errorMiddleware.js"
import jobRoutes from './routers/jobRoutes.js'
import userRoutes from './routers/userRoutes.js'
import cookieParser from "cookie-parser"; 

const port = process.env.PORT || 8000;

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());



app.use('/api/jobs', jobRoutes);
app.use('/api/users', userRoutes);


if (process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname, '/frontend/build')));

    app.get('*', (err, req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html')))
}else{
    app.get('/', (req, res) =>{
        res.send('running API server');
    });
}

//middleware
app.use(notFound);
app.use(errorHandler);

app.listen(port), () =>(console.log(`server running on port on ${port}` ));