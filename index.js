const express = require('express')
const app = express()

const info =require("./routes/info")
const authRoutes=require('./routes/auth')
const userRoutes=require('./routes/user')

const port = 4000

const mongoose = require('mongoose');
//Set up default mongoose connection

const bodyParser=require('body-parser')
const cookieParser =require('cookie-parser')
const cors=require('cors')

app.use(express.static("public"))

//app.use(bodyParser.urlencoded({extended:true}));

app.use(bodyParser.json())
app.use(cors())

//Database connection
mongoose.connect("mongodb://localhost:27017/icode").then(()=>{
console.log("DB Connected");
});

//using middlewares 
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

app.get('/',(req,res)=>{

  res.render("index");
})
app.get('/signup',(req,res)=>{

  res.render("signup");
})

app.get('/signin',(req,res)=>{

  res.render("signin");
})
app.use('/api', info)
app.use("/api",authRoutes);
app.use("/api",userRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})






