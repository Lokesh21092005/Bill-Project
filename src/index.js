import dotenv from "dotenv";
import connectDB from "./db/index.js";
import { app } from "./app.js"; 

dotenv.config({
    path: './.env'
});

connectDB()
.then(() => {
     app.listen(PORT, '0.0.0.0', () => {
        console.log(`Server is Running at port : ${process.env.PORT || 8000}`);
    });
})
.catch((error) => {
    console.log("MONGO db connection failed !!!", error);
});
