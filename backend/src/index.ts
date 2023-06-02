import express from 'express';
import mongoose from 'mongoose';
import productsRoutes from "./routes/products"
import usersRoutes from "./routes/users"
import cors from "cors"
import path from 'path';

const app = express();

const connect_url = "mongodb://0.0.0.0/mern_ecommerce"
const port = 4000

//app.use(express.static(path.join(__dirname, 'dist')));

app.use(express.json({limit: "30mb"}));
app.use(express.urlencoded({limit: "30mb", extended: true}));

app.use(cors());

app.use('/products', productsRoutes)
app.use('/users', usersRoutes)

mongoose.connect(connect_url)
  .then(() => app.listen(port, () => console.log(`Server is running on ${port}`)))
  .catch((err) => console.log("error", err.message));