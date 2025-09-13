import express from "express";
import connectDB from "./DB/db.js";
import adminRouter from "./routes/admin.js"
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: "*" || process.env.VITE_API_URL, credentials: true }));

app.use("/admin", adminRouter)

connectDB().then((v) => {
    if(v){
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        })
    }
    else{
        console.log("Error In MongoDB")
    }
})
