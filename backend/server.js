import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import todoRoutes from "./routes/todo.route.js";
import { connectDB } from './config/db.js';
import cors from 'cors' ;
const PORT = process.env.PORT || 5000;

dotenv.config({path: '../.env'});

const app = express();

app.use(express.json())

app.use('/api/todos' ,todoRoutes);

const __dirname = path.resolve();
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/dist")));
  app.get(/.*/, (req ,res) => {
    res.sendFile(path.resolve(__dirname, "frontend" , "dist" , "index.html"));
  })
}

app.listen(PORT, () => {
    connectDB();
    console.log("Server Started at http://localhost:5000");
});
