const express = require("express");
const cors = require("cors");
const colors = require("colors");
const dotenv = require("dotenv").config();
const morgan = require("morgan");
const connectDB = require("./config/db")
const userRoutes = require('./routes/userRoutes')



//Database connection
connectDB();


//Rest
const app = express();

//middleware
app.use(cors())
app.use(morgan('dev'))
app.use(express.json())


//routes
//user routes
app.use("/api/v1/auth", require('./routes/userRoutes') );

//transection routes
app.use('/api/v1/transections', require("./routes/transectionRoutes"))

const PORT = 8080 || process.env.PORT

app.listen(PORT, ()=>{
    console.log(`Server is Running on port ${PORT} in ${process.env.MODE}`.bgGreen.red)
})

