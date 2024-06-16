const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const port = 3019;


const app = express();
app.set("view engine","ejs");
app.use(express.static("public"));

// Middleware
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies
// Add more middleware as needed

// Routes
app.get('/', (req, res) => {
  res.render("form")
});

app.post('/post',async(req,res)=>{
  const {regd_no,name,email,ph_no,branch}=req.body;
    const user=new Users({
      regd_no,
      name,
      email,
      ph_no,
      branch
    })
    await user.save()
    console.log(user)
    res.send("Form Submission Successful")
})

const userSchema= new mongoose.Schema({
  regd_no:String,
  name:String,
  email:String,
  ph_no:Number,
  branch:String
});

const Users=mongoose.model("data",userSchema)
// Database connectionsww22
mongoose.connect('mongodb://localhost:27017/students')
  
.then(() => {
  console.log('Connected to MongoDB');
})
.catch((error) => {
  console.error('Error connecting to MongoDB:', error);
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`)
    })
