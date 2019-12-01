const express=require('express');
const route=express.Router();

const {passport}=require('./../../passport');

const userdatabaseHandler=require('./../../database/userDatabaseHandler');

const checkUserLogin=(req,res,next)=>{
    if(!req.user || !req.user.get().Name)
    {
        res.redirect("./login.html");
        return;
    }
    next();
}

route.post('/checkCredentials',(req,res)=>{
    userdatabaseHandler.checkEmail(req.body.email)
    .then(response=>{
        res.send(response)
    });
});

route.post("/signup",(req,res,next)=>{
    userdatabaseHandler.addUser(req.body.Name,req.body.Address,req.body.Email,req.body.Mobile,req.body.password);
    res.redirect('/login.html');
})

route.post("/login",passport.authenticate("user",{
    successRedirect:"/user",
    failureRedirect:"/login.html"
}));

route.use(checkUserLogin,(req,res,next)=>{
    next();
})

route.use(express.static(__dirname + "/../../private/user"));

route.get("/getProductHomepage",(req,res)=>{
    const productType=req.query.productType;
    userdatabaseHandler.getProductsHomepage(productType)
    .then(products=>res.send(products));
});

route.get("/getProductSearch",(req,res)=>{
    const name=req.query.name;
    userdatabaseHandler.getProductsSearch(name)
    .then(products=>res.send(products));
});

route.get("/getProductFiltered",(req,res)=>{
    userdatabaseHandler.getProductsFiltered(req.query.productType || "",req.query.productSubtype || "",req.query.maxPrice || "999999999", req.query.minPrice || "0")
    .then(products=>res.send(products));
});

route.get('/product/:id',(req,res)=>{
    res.redirect('/user/product.html?id='+req.params.id);
});

route.get('/getProductDetails/:id',(req,res)=>{
    userdatabaseHandler.getProductDetails(req.params.id)
        .then(products=>res.send(products));
});

route.post('/addReview',(req,res)=>{
    userdatabaseHandler.addReview(req.body.reviewText,req.body.reviewStars,req.body.productId,req.user.id)
    res.redirect("/user/product.html?id="+req.body.productId);
});

route.post("/addCartItem",(req,res)=>{
    userdatabaseHandler.addCartItem(req.user.id,req.body.productId)
    .then(status=>res.send(status));
});

route.get("/getCartItems",(req,res)=>{
    userdatabaseHandler.getCartItems(req.user.id)
    .then(cartItems=>res.send(cartItems));
})

route.delete('/deleteCartItem',(req,res)=>{
    userdatabaseHandler.deleteCartItem(req.body.productId,req.user.id);
    res.sendStatus(200);
})

route.get('/getOrderDetails',(req,res)=>{
    userdatabaseHandler.getOrderDetails(req.user.id)
    .then(cartItems=>res.send(cartItems));
});

route.post('/placeOrder',(req,res)=>{
    userdatabaseHandler.getOrderDetails(req.user.id)
    .then(cartItems=>{
        const dateObject=new Date();
        let time=dateObject.toTimeString().split(" ")[0].split(":");
        time.pop();
        time=time[0]+":"+time[1];
        const date=dateObject.toDateString();

        const databaseTime=time+" "+date;

        Promise.all(cartItems.map(cartItem=>{
            userdatabaseHandler.addToOrder(databaseTime,cartItem.quantity,req.body.method,req.user.id,cartItem.productId,cartItem.product.vendor.id)
        }))
        .then(()=>userdatabaseHandler.emptyCartList(req.user.id))
        .then(()=>res.redirect("/user"));
    });
});

route.get('/getOrders',(req,res)=>{
    userdatabaseHandler.getOrders(req.user.id)
    .then(orders=>res.send(orders));
});

route.get("/getUsername",(req,res)=>{
    userdatabaseHandler.getUsername(req.user.id)
    .then(user=>res.send(user));
});

module.exports={
    route
}
