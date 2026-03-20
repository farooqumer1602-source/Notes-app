const mongoose = require('mongoose');
const bcrypt = require('bcrypt')

const Usershema = new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
});

Usershema.pre("save", async function () {
    if(!this.isModified('password')) return 
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
})

Usershema.methods.matchpassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword , this.password)
}

const User = mongoose.model('Users', Usershema);
module.exports = User