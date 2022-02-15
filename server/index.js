import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import router from "./routes/router.js"

const app = express();
const PORT = 5000;
const CONNECTION = "mongodb+srv://general:Hyz3HbdF4QFdcXHG@cluster0.xczvb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

app.use(express.json({extended: true}))
app.use(express.urlencoded({extended: true}))
app.use(cors())

app.use('/api', router)

mongoose.connect(CONNECTION)
    .then(() => app.listen(PORT, () => console.log(`Server is running on port ${PORT}.`)))
    .catch((err) => console.log(err.message));