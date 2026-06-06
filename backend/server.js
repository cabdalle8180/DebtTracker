import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/dbs.js';
// import connectDB from './config/db.js';

dotenv.config();
const app = express();

app.get('/', (req, res) =>{
    res.status(200).json("hello")
})

const PORT = process.env.PORT || 3000;
connectDB();
app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});

