const express = require('express');
const mongoose = require('mongoose');
const TaskSchema = require('./model');
const cors = require('cors');
const model = require('./model');
const model2 =require('./model2');


const app = express();
app.listen(4000,()=> console.log('Server running...'));

mongoose.connect("mongodb://0.0.0.0:27017/task",
{
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(
    ()=>console.log('DB Connected')
)

app.use(express.json())

// by keeping * in origin means to any frontend applications can use our backend service
app.use(cors({
    origin: '*'
}))

app.post('/addtask', async(req,res) => {
    const mode = new model(req.body)
    try{
        await mode.save()
        res.status(201).json({
            status: 'Success',
            data : {
                mode
            }
        })
    }catch(err){
        res.status(500).json({
            status: 'Failed',
            message : err
        })
    }
})

app.get('/gettask',async(req,res) => {
    try{
        return res.json(await model.find()) ;
    }
    catch(err){
        console.log(err)
    }
})

app.delete('/delete/:id',async(req,res) => {
    try{
        await model.findByIdAndDelete(req.params.id);
        return res.json(await model.find())
    }
    catch(err){
        console.log(err)
    }
})
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
})

const User = new mongoose.model("User", userSchema)

//routes routes
app.post("/Login",async(req,res)=>{
    const {email,password} =req.body;
    const exist = await model2.find({email})
    User.findOne({email:email},(err,user)=>{
        if(user){
           if(password === user.password){
               res.send({message:"login sucess",user:user})
           }else{
               res.send({message:"wrong credentials"})
           }
        }else{
            res.send("not register")
        }
    })
});
app.post("/Register",(req,res)=>{
    console.log(req.body) 
    const {name,email,password} =req.body;
    User.findOne({email:email},(err,user)=>{
        if(user){
            res.send({message:"user already exist"})
        }else {
            const user = new User({name,email,password})
            user.save(err=>{
                if(err){
                    res.send(err)
                }else{
                    res.send({message:"sucessfull"})
                }
            })
        }
    })


})


     