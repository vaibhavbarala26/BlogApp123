const mongoose = require("mongoose")
const a = "mongodb+srv://golu:vaibhav@cluster0.omnybfa.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
async function run (){
    try{
    await mongoose.connect(a)
    .then(()=>console.log("connected"))
}
catch(e){
    console.log(e);
}
}
module.exports = run();
