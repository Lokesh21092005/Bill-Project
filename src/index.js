import dotenv from "dotenv";
import connectDB from "./db/index.js";
import { app } from "./app.js"; 

dotenv.config({
    path: './.env'
});

connectDB()
.then(() => {
     const PORT = process.env.PORT || 10000;
    app.listen(PORT, '0.0.0.0', () => {
        console.log(`Server is running at port: ${PORT}`);
    });
})
.catch((error) => {
    console.log("MONGO db connection failed !!!", error);
});
