import dotenv from "dotenv";
import connect_DB from "./db/index.js";
import { app } from "./app.js";

dotenv.config({
    path: "./.env"
});

connect_DB()

app.get("/", (req, res) => {
    res.send("CareOps Server is Running! 🚀")
})

app.listen(process.env.PORT || 7000, () => {
    console.log(`\n ✅ Server started on port ${process.env.PORT} ⚡`)
})