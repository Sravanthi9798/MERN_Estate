const express = require('express');
const mongoose=require('mongoose');
const dotenv=require('dotenv');
import userRouter from './routes/user.route.js';
dotenv.config();

mongoose.connect(process.env.MONGO_DB).then(()=>{
  console.log("Connected successfully")
}).catch((err)=>{
  console.log(err)
})

const app = express();

app.use(express.json());

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.use("/Server/user",userRouter);
