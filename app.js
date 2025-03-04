import express from 'express';
import bodyParser from 'body-parser';


const app = express();

//To link user router
import UserRouter from './routes/user.router.js';
import categoryRouter from './routes/category.router.js';

//Middleware 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/user", UserRouter);
app.use("/category", categoryRouter)


app.listen(3001);
console.log("App listening on http://localhost:3001");
