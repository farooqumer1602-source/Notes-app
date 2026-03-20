const express = require('express');
const app = express();
const connectDB = require('./config/db')
const Userrouter = require('./routes/User')
const Noterouter = require('./routes/Notes')
const PORT = process.env.PORT
connectDB();


app.use(express.json());
app.use('/api',Userrouter);
app.use('/api/notes',Noterouter);
app.listen(PORT, ()=>{
    console.log('hello')
})