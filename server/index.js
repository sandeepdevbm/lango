import express from 'express'
import bodyParser from "body-parser"
import mongoose from "mongoose"
import cors from "cors"
import dotenv from "dotenv"
import helmet from "helmet"
import morgan from "morgan"
import multer from 'multer'
import path from "path"
import cookieParser from 'cookie-parser'
import authRoutes from "./Routes/authRoutes.js"
import chatRoute from "./Routes/chatRoute.js"
import messageRoute from "./Routes/messageRoute.js"
import { fileURLToPath } from 'url'


//CONFIGURATION

// const __filename = fileURLToPath(import.meta.url)
// const __dirname = path.dirname(__filename)
dotenv.config()
const app = express()
const upload = multer({ dest: 'uploads/' });

app.use(morgan("dev"))

app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'PUT' ,'PATCH', 'POST', 'DELETE'],
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization']
}));
// app.use(helmet())
app.use(express.static('public'))
// app.use(helmet.crossOriginResourcePolicy({policy :"cross-origin"}))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended:true}))  
// app.use("/assets",express.static(path.join(__dirname, 'public/assets')))
app.use(express.json())
app.use(cookieParser())
app.use(authRoutes)
app.use('/chat',chatRoute)
app.use('/message',messageRoute)



// MONGOOSE SETUP
const PORT = process.env.PORT || 6001
mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
}).then(()=>{
    app.listen(PORT, ()=> console.log(`SERVER RUNNING AT ${PORT}`))
}).catch((error)=> console.log(`${error} did not connect`))


