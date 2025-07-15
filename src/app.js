import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors"
import cookieParser from "cookie-parser";
import  billRoutes from "./routes/bill.routes.js"



const app = express()


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


app.use(express.static(path.join(__dirname, "public")));

app.use(cors({
    origin : "https://lokesh21092005.github.io",
    credentials : true
}));

app.use(express.json()) 
app.use(express.urlencoded({extended : true})) 
app.use(express.static("public")) 
app.use(cookieParser())

//routes import
import userRouter from './routes/user.routes.js'

// routes declaration
app.use("/api/v1/users" , userRouter);

// http://localhost:5000/api/v1/users/register



app.use(express.json());
app.use('/api/v1/bill', billRoutes);

app.listen(3000, () => {
  console.log('Server started on port 3000');
});



export { app }