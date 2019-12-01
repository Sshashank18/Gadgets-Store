const passport=require("passport");
const LocalStrategy=require('passport-local').Strategy;
const {Users,Vendors}=require('./database/database');
const bcrypt=require('bcrypt');

passport.use("user",new LocalStrategy((username,password,done)=>{
    Users.findOne({
        where:{
            Email:username
        }
    })
    .then(user=>{
        if(!user)
            return done(null,false,{message:"No User Exist"});
        else if (bcrypt.compare(password,user.password,(err,res)=>res))
            return done(null,false,{message:"Wrong Username or Password"});
        else 
            done(null,user);
    });
}));

passport.use("vendor",new LocalStrategy((username,password,done)=>{
    Vendors.findOne({
        where:{
            CompanyEmail:username
        }
    })
    .then(user=>{
        if(!user)
            return done(null,false,{message:"No User Exist"});
        else if (bcrypt.compare(password,user.password,(err,res)=>res))
            return done(null,false,{message:"Wrong Username or Password"});
        else 
            done(null,user);
    });
}));

passport.serializeUser((user,done)=>{
    if(user.CompanyEmail)
    {
        done(null,{
            id:user.id,
            bVendor:true
        });
    }
    else{
        done(null,{
            id:user.id,
            bVendor:false
        });
    }
});

passport.deserializeUser((userObject,done)=>{
    if(userObject.bVendor)
    {
        Vendors.findOne({
            where:{
                id:userObject.id
            }
        })
        .then(user=>done(null,user))
        .catch(done);
    }
    else{
        Users.findOne({
            where:{
                id:userObject.id
            }
        })
        .then(user=>done(null,user))
        .catch(done);
    }
});

module.exports={
    passport
}