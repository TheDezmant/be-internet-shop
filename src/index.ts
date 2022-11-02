import express,{Application} from "express"
import * as dotenv from "dotenv"
import router from "./routes/index"
import fileUpload from "express-fileupload"
import {ErrorHandler} from './middleware/ErrorHandlingMiddleware'
import path from "path";
import {corsMiddleware} from "./middleware/corsMiddleware";
dotenv.config()


const PORT = process.env.PORT || 8080

const app:Application = express()
app.use(corsMiddleware)
app.use(express.json())
app.use(fileUpload({}))
app.use(express.static(path.resolve(__dirname,"static")))

app.use('/api',router)
app.use(corsMiddleware)
//Обработка ошибока, последний Middleware
app.use(ErrorHandler)


const start = () => {
    try {
        app.listen(PORT,()=>console.log(`Server started on port ${PORT}`))
    }catch (e) {
        console.log(e)
    }
}

start()