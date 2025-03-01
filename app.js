import express from 'express';
import bodyParser from 'body-parser';

const app = express();

//To link user router
import UserRouter from './routes/user.router.js';

//Middleware 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/user", UserRouter);
app.use("/login", UserRouter);

app.listen(3001);
console.log("App listening on 3001");
