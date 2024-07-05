const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const dotenv = require('dotenv')
const colors = require('colors')
const connectDb = require('./config/connectDb')
const path = require('path')
dotenv.config()


//connect db
connectDb()

//rest object
const app = express()

//middlewares
//middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(cors({
    origin: ["https://fintrack-client.vercel.app/"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
}));


//routes
//user routes
app.use('/api/v1/users', require('./routes/userRoute'))

//transaction routes
app.use('/api/v1/transactions', require("./routes/transactionRoutes"))

//static files
// app.use(express.static(path.join(__dirname, './client/build')))

// app.get('*', function (req, res) {
//     res.sendFile(path.join(__dirname, "./client/build/index.html"))
// })

app.get("/", (req, res) => {
    res.send("Hello")
})

const PORT = 8080 || process.env.PORT

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})
