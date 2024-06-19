const express = require("express");
const cors = require("cors")
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const UserModel = require("./models/User");
const cookieParser = require("cookie-parser")
const session = require("express-session")
const jwt = require("jsonwebtoken")
const PostModel = require("./models/Post")
const multer = require("multer")
const uploadmid = multer({dest :"upload/"})
const fs = require('fs'); 
const app = express();
const PORT = 1000;
app.use(cors({
    credentials: true,
    origin: "http://localhost:5173"
}));
app.use("/upload" , express.static(__dirname + "/upload"))
app.use(cookieParser());
app.use(express.json());
app.use(session({
    secret: "goluu",
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: 6000 * 60,
    }
}));
const bcrypt = require("bcryptjs")
const secret = "vaibhavbarala"
const a = "mongodb+srv://Vaibhav:1234@cluster0.omnybfa.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
async function run() {
    try {
        await mongoose.connect(a)
            .then(() => console.log("connected"))
    }
    catch (e) {
        console.log(e);
    }
}
run();
app.post("/register", async (req, res) => {
    const { username, password } = req.body;
    var salt = bcrypt.genSaltSync(10);
    const doc = await UserModel.create({ username, password: bcrypt.hashSync(password, salt) });
    res.send(doc);
});
/*app.get("/", async (req, res) => {
    req.session.visited = true;
    res.cookie("helloe", "world", { maxAge: 6000 * 60 })
    res.send("cookies")
    console.log(req.cookies);
})
app.get("/cookie", (req, res) => {
    console.log(req.session);
    console.log(req.session.id);
    if (req.cookies.helloe && req.cookies.helloe === "world") {
        return res.send("welcome user");
    }
    return res.status(400).send("sorry");
})
app.post("/api/auth", async (req, res) => {
    const { username, password } = req.body;
    const find = mock.find((user) => user.username === username);
    if (!find) return res.status(400).send({ msg: "BAD" })
    if (find.password !== password) {
        return res.status(400).send({ msg: "BAD" })
    }
    req.session.user = find;
    res.status(200).send(req.sessionID)
    

})
app.get("/api/auth/status" , async(req , res)=>{
    return req.session.user ? res.status(200).send(req.sessionID):res.status(401)
})
app.get("/get" , async(req , res)=>{
    res.send(req.sessionID)
})
app.post("/api/cart" , async(req , res)=>{
    if(!req.session.user) return res.status(401).send("kaha");
    const {item} = req.body;
    const {cart} = req.session;
    if(cart){
        cart.push(item);
    }
    else{ 
        req.session.cart = [item];
    }
    return res.status(201).send(cart)
})
app.get("/api/cart" , (req , res)=>{
    if(!req.session.user) return res.status(401).send("kaha");
    return res.send(req.session.cart ?? []);
})*/
app.post("/login" , async(req , res)=>{
    const {username , password} = req.body;
    const user = await UserModel.findOne({username});
    if(!user){
        return res.status(401).send("Wrong Credentials");
    }
    const ispass = await bcrypt.compare(password , user.password);
    if(!ispass){
        res.json("wrond credentials")
    }
    const token = await jwt.sign(
        {username , 
        password} , 
        secret , 
        {  expiresIn :"90d"}
    )
    console.log("HO gyaaa"); 
    res.status(201).json( {id: user._id.toString() , token , username:user.username}) 
})
app.get("/user" , async(req , res)=>{
    const token = req.header("Authorization")
    const jwttoken = token.replace("Bearer" , "").trim();
    try{ 
       const isverified = jwt.verify(jwttoken , secret);
       const userData = await UserModel.findOne({username:isverified.username}).select({password:0})
       req.user = userData;
       req.token = token;
       req.userID = userData._id;
       res.status(200).json({msg: userData})
    }
    catch(e){
        console.log("error"); 
    }
})
app.post("/upload" , uploadmid.single("file") , async(req , res)=>{
    const {originalname , path} = req.file;
    const parts = originalname.split('.');
    const ext = parts[parts.length-1];
    const newPath = path+'.'+ext;
    fs.renameSync(path , newPath);
    console.log(ext);
    const{title , summary , content , author} = req.body;
    const userdata = PostModel.create({title , summary , content , file:newPath , author})
    res.json({userdata});
})
app.get("/post" , async(req , res)=>{
    res.json(await PostModel.find().sort({createdAt:-1}).limit(20))
})
app.get("/post/:id" , async(req ,res)=>{
    const {id} = req.params;
    const postData = await PostModel.findById(id);
    res.json({msg:postData});
})
app.put("/post/:id" , async(req , res)=>{
    const {id} = req.params;
    const {title , summary , content} = req.body;
    const updated = await PostModel.findByIdAndUpdate(id , req.body )
    console.log(updated);
    res.json(updated);

})
app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`)
})