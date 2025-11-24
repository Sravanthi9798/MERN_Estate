import express, { json } from 'express';
import { connect } from 'mongoose';
import { config } from 'dotenv';
import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js';
config();

connect(process.env.MONGO_DB).then(()=>{
  console.log("Connected successfully")
}).catch((err)=>{
  console.log(err)
})

const app = express();

app.use(json());

app.use(express.json());
const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.get('/test',(req,res)=>{
    res.send({
        message:'Hello World!',
    })
});

// app.use("/api/user",userRouter)
app.use("/api/auth",authRouter)

app.use((err,req,res,next)=>{
const statusCode=err.statusCode||500;
const message=err.message||'Internal server error';
return res.status(statusCode).json({
  success:false,
  statusCode,
  message,
});
});