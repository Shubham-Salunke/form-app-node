const express=require('express');
const cors=require('cors');
const app=express();
const dotenv=require("dotenv")
const mongoose=require('mongoose');
dotenv.config()
const {Schema}=mongoose;

app.use(cors(
    {
        origin: 'http://localhost:5173', 
        methods: ['GET', 'POST'],
        
    }
))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



const userSchema=new Schema({
    name:String,
    email:String,
    password:String,
    message:String,
    number:Number,
    userName:String
    
})
const User=mongoose.model('User',userSchema);

app.post('/api/users',async(req,res)=>{
    const user=req.body;
    try{    
    const existingUser= await User.findOne({email:user.email});
    if(existingUser){
return res.status(400).json({ message: "User already exists" });
    }
    const newUser=await User.create(user)
  res.status(201).json({message:"User created successfully",user:newUser});
}catch(error){
    console.error('error creating user',error);
    res.status(500).json({message:"Internal server error"});
}

});
app.get('/api/users',async(req,res)=>{
    const {email}=req.body;
    try{ 
        const users=await User.find();
        if(!users || users.length ===0){
            return res.status(404).json({message:"No users are found"});
        }
        res.status(200).json({message:"Users are found successfully",users:users.length}).send(users);
    }
  catch(error){
    console.error('error fetching users',error);
    res.status(500).json({message:"Internal server error"});
  }
})
mongoose.connect(process.env.MONGO_URI).then(()=>{
console.log('Connected to mongoDB');
})
app.listen(3000,()=>{
    console.log('Server is running on port 3000');

});