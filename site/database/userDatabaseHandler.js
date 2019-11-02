const {Users,Products,Vendors,Orders,Cartitems}=require('./database');
const Op=require('sequelize').Op;

const productsParser=(products)=>{
    let productsData=[];
    products.map(product=>productsData.push(product.get()))
    return productsData;
}

const getProductHomepage=(productType)=>{
    return Products.findAll({
        where:{
            productType
        }
    }).then(products => productParser(products));
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

const addCartItem=(userId,productId)=>{
    return Cartitems.findOne({
        where:{
            userId,
            productId
        }
    }).then(cartItem=>{
        if(cartItem){
            return cartItem.update({
                quantity:cartItem.quantity+1
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

const deleteCartItems=(productId,userId)=>{
    CartItems.destroy({
        where: {
            productId,
            userId
        }
    });
}