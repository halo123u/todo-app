const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;


const UserSchema =  new Schema({
    
    email: {
        type: String,
        require: true,
        trim: true,
        minlength: 1,
        unique : true,
        validate: {
            validator: validator.isEmail,
        }

    },
    gamertag:{
        type :String,
        required: true,
    },
    password: {
        type: String,
        require: true,
        minlength : 6
    },
    tokens: [{
        access: {
            type: String,
            required : true
        },
        token: {
            type: String,
            required : true
        }
    }]
});
UserSchema.pre('save', function (next) {
    const user = this;
    if(user.isModified('password')){
        bcrypt.genSalt(10, (err, salt)=>{
            bcrypt.hash(user.password,salt,(err,hash)=>{
                user.password= hash;
                next();
            });    
        });
    }else{
        next();
    }
})
UserSchema.methods = {
    generateAuthToken: function () {
        const user = this;        
        const access = 'auth';
        const token = jwt.sign({_id:  user._id.toHexString(), access},'abc123').toString();

        user.tokens.push({access, token});
        return user.save().then(()=>{
            return token;
        });
    },
    toJSON: function () {
     const user = this;
     const userObject = user.toObject();
     return _.pick(userObject, ['_id', 'email', 'gamertag']);   
    },
    removeToken : function (token) {
        const user = this;
        return user.update({
            $pull: {
                tokens: {token}
            }
        });
        
    }
}

UserSchema.statics = {
    findByToken : function (token) {
        const User = this;
        var decoded;

        try{
            decoded = jwt.verify(token, 'abc123');
        } catch (e){
            return Promise.reject();
        }

        return User.findOne({
            '_id': decoded._id,
            'tokens.token': token,
            'tokens.access' : 'auth'
        });
    },
    findByCredentials : function (email, password) {
        const User = this;

        return User.findOne({email}).then((user)=>{
            if(!user){
                return Promise.reject();
            }

            return new Promise((resolve, reject) =>{
                bcrypt.compare(password,user.password,(err,res)=>{
                    if(res){
                        resolve(user);
                    } else{
                        reject();
                    }
                });
            });
        });
    }
}

const User = mongoose.model('User', UserSchema);
module.exports = User;