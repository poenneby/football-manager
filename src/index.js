import dotenv from "dotenv";
import app from "./server";

dotenv.config();
const PORT = process.env.PORT || 3000;
app.listen(PORT);

console.debug("Server listening on port: " + PORT);
