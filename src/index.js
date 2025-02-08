import express  from "express";
import { PORT } from "./config.js";
import  cors from 'cors'
import morgan  from "morgan";
import userRoutes from "./routes/users.routes.js";

const app = express()
app.use(cors())
app.use(morgan('dev'))

app.use(express.json())
app.use(userRoutes)

app.listen(PORT)

console.log(`Servidor rodando na porta`, PORT)
