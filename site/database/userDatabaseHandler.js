const {Users,Products,Vendors,Orders,Cartitems,Reviews}=require('./database');
const Op=require('sequelize').Op;
const bcrypt = require("bcrypt");


const addUser = (Name, Address, Email, Mobile, password) => {
    bcrypt.hash(password, 10, function(err, hash) {
        
        Users.create({
            Name,
            Address,
            Email,
            Mobile,
            password: hash
        });
    });   
}

const productsParser=(products)=>{
    let productsData=[];
    products.map(product=>productsData.push(product.get()))
    return productsData;
}


const getProductsHomepage=(productType)=>{
    return Products.findAll({
        where:{
            productType
        }
    }).then(products =>products);
}

const getProductsFiltered=(productType,maxPrice,minPrice)=>{
    return Products.findAll({
        where:{
            [Op.and]:{
                productType,
                Price:{
                    [Op.between]:[minPrice,maxPrice]
                }
            }
        }
    }).then(products=>productsParser(products)); //try this without using product parser
}

const getProductDetails = (productId) => {
    return Products.findOne({
        include: [
                    {
                        model:Reviews,
                        attributes: ["userId", "stars", "review"],
                        include: {model: Users, attributes: ["Name"]}   
                    },
                    {model: Vendors, attributes: ["CompanyName"]}
                ],
        attributes: ["image", "Name", "Price"],
        where: {
            id: productId
        }
    })
     .then(product => product);
}

const addCartItem=(userId,productId)=>{
    return Cartitems.findOne({
        where:{
            userId,
            productId
        }
    }).then(cartItem=>{
        if(cartItem){
            return cartItem.update({
                quantity:parseInt(cartItem.quantity) + 1
            },
            {
                where:{
                    userId,
                    productId
                }
            }).then(()=>"Exist");
        }
        else{
            return Cartitems.create({
                userId,
                productId,
                quantity:1
            }).then(()=>"Created")
        }
    });
}

const getCartItems=(userId)=>{
    return Cartitems.findAll({
        include:[{model:Products,attributes:["Name","Price","id"]}], //used this because we only have data of quantity in cartItems ,rest can be extracted from products table
        attributes:["quantity"],
        where:{
            userId
        }
    }).then(cartItems=>productsParser(cartItems));
}

const deleteCartItem=(productId,userId)=>{
    Cartitems.destroy({
        where: {
            productId,
            userId
        }
    });
}

const updateQuantityIncr = (productId, userId, quantity) => {
    console.log(quantity);
    Cartitems.update({
        quantity
    },
    {
        where: {
            userId,
            productId
        }           
    }).then(()=>console.log("done"));
}

const getOrderDetails=(userId)=>{
    return Cartitems.findAll({
        include:[
            {
                model:Products,
                attributes:['Name','Price'],
                include:{
                    model:Vendors,attributes:['CompanyName',"id"]
                }
            },
            {
                model:Users,
                attributes:["Name"]
            }
        ],
        attributes:["id","quantity","userId","productId"],
        where:{
            userId
        }
    })
    .then(products=>productParser(products));
}

const addToOrder=(time,quantity,method,userId,productId,vendorId)=>{
    return Orders.create({
        time,
        quantity,
        method,
        userId,
        productId,
        vendorId
    });
}

const emptyCartList=(userId)=>{
    return Cartitems.destroy({
        where:{
            userId
        }
    })
}

const addReview = (review, stars, productId, userId) => {
    Reviews.create({
        review,
        stars,
        productId,
        userId
    });
}

const getOrders=(userId)=>{
    return Orders.findAll({
        where:{
            userId
        },
        attributes:["quantity","time","method","status"],
        include:[
            {
                model:Vendors,attributes:["CompanyName","CompanyEmail","CompanyMobile"]
            },
            {
                model:Products,attributes:["id","Name","Price","image"]
            },
            {
                model:Users,attributes:["Name"]
            }
        ]
    })
    .then(orders=>productParser(orders));
}

const checkEmail=(email)=>{
    return Users.findOne({
        where:{
            email
        }
    }).then(user=>{
        if(user)
            return "Exist";
        else    
            return "Nope";
    });
}

module.exports={
    addUser,
    getProductsHomepage,
    getProductsFiltered,
    addCartItem,
    getCartItems,
    deleteCartItem,
    getOrderDetails,
    addToOrder,
    emptyCartList,
    getOrders,
    checkEmail,
    getProductDetails,
    addReview,
    updateQuantityIncr
}