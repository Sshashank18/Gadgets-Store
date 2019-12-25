const express=require('express');
const session=require('express-session');

const userRouter = require('./routes/api/user').route;
const vendorRouter=require('./routes/api/vendor').route;
const{passport}=require('./passport');

const {database}=require('./database/database');

const server=express();

server.use(express.json());
server.use(express.urlencoded({extended:true}));

server.use(session({
    secret:'GADGETS',
    resave:false,
    saveUninitialized:true,
}));

server.use(passport.initialize());
server.use(passport.session());

server.use('/products',express.static('./uploads'));
server.use(express.static('./public'));

server.use('/user',userRouter);
server.use('/vendor',vendorRouter);

server.get('/logout',(req,res)=>{
    req.logout();
    res.redirect('/');
});

const PORT =7700;
database.sync()
    .then(()=>{
        console.log("SQL database synced");
        server.listen(PORT,()=>console.log("Server Up and Running on http://127.0.0.1:"+PORT));
    });