const express=require('express');
const session=require('express-session');
const MongoStore=require('connect-mongo')(session);

const userRouter = require('./routes/api/user').route;
const vendorRouter=require('./routes/api/vendor').route;
const{passport}=require('./passport');

const {database}=require('./database/database');

const server=express();

server.use(express.json());
server.use(express.urlencoded({extended:true}));

const sessionMiddleware=session({
    secret:'GADGETS',
    resave:false,
    saveUninitialized:true,
    storage:new MongoStore({
        url:"mongodb://127.0.0.1:5000/sessions"
    })
});

server.use(sessionMiddleware);
server.use(passport.intialize());
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
        server.listen(PORT,()=>console.log("Server Up and Running on 127.0.0.1:"+PORT));
    });