import express  from "express";  
import {config} from "./config.js";
import userRoutes from "./routes/user.routes.js";
import morgan from "morgan";
const app = express();


app.use(morgan("dev"));
app.use(express.json());
app.use(userRoutes);
app.listen(config.port, () => {
  console.log(`Server is running on port ${config.port}`);
});


