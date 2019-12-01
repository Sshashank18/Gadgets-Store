const express=require('express');
const multer=require('multer');

const route=express.Router();
const upload=multer({dest:__dirname+"./../../uploads/"});

const {passport}=require('./../../passport');
const vendordatabaseHandler=require('./../../database/vendorDatabaseHandler');

const checkVendorLogin=(req,res,next)=>{
    if(!req.user || !req.user.get().CompanyName)
    {
        res.redirect("./login.html");
        return;
    }
    next();
}

route.post("/signup",(req,res,next)=>{
    vendordatabaseHandler.addVendor(req.body.CompanyName,req.body.CompanyAddress,req.body.CompanyEmail,req.body.CompanyMobile,req.body.password);
    res.redirect('/login.html');
});

route.post("/login",passport.authenticate("vendor",{
    successRedirect:"/vendor",
    failureRedirect:"/login.html"
}));

route.post('/addProduct',upload.single("itemPhoto"),(req,res,next)=>{
    vendorDatabaseHandler.addProduct(req.body.itemName, req.body.itemPrice, req.body.productType, req.body.productSubtype, req.file.filename,req.user.id);
    res.redirect("/vendor");
});

route.get('/products',(req,res,next)=>{
    vendordatabaseHandler.getProducts(req.user.get().id)
    .then(products=>res.send(products));
});

route.get('/getOrders',(req,res)=>{
    vendordatabaseHandler.getOrders(req.user.id)
    .then(orders=>res.send(orders));
});

route.patch('/dispatchOrder',(req,res)=>{
    vendordatabaseHandler.dispatchOrder(req.body.id)
    .then(()=>res.sendStatus(200));
});

route.patch("/declineOrder",(req,res)=>{
    vendordatabaseHandler.declineOrder(req.body.id)
    .then(()=>res.sendStatus(200));
});

route.use(checkVendorLogin,(req,res,next)=>{
    next();
});

route.get("/getUsername",(req,res)=>{
    vendordatabaseHandler.getUsername(req.user.id)
    .then(user=>res.send(user));
});

route.use(express.static(__dirname+ "/../../private/vendor"));

module.exports={
    route
}
