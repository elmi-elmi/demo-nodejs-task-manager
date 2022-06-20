const mongoose  = require('mongoose');
const  bcrypt   = require('bcryptjs')
const validator = require( "validator");

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    age:{
        type:Number,
        default:0,
        validate(v){
            if(v<0) throw new Error("You'v not come to this universe?")
        }
    },
    email:{
        type:String,
        required:true,
        trim:true,
        validate(v){
            if(!validator.isEmail(v)) throw new Error('this email is just a pic of shit 💩')
        }
    },
    password:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        minLength:7,
        validate(v){
            if(validator.contains(v,'password')) throw new Error('really? password? shame on you bro')
            // if(!validator.isLength(v,{min:6})) throw new Error('Just my luck')
        }
    }
})

userSchema.statics.findByCredentials = async (email, password)=>{
    console.log('***************************', email,password)
    const user = await User.findOne({email})

    if(!user) throw new Error('unable to login (1)')

    const isMatch = await bcrypt.compare(password, user.password)

    if(!isMatch) throw new Error('Unable to login (2)')

    return user
}

userSchema.pre('save',async function(next){
    const user = this;

    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password,8)
    }

    next();
})
const User = mongoose.model('user',userSchema)


module.exports = User;
